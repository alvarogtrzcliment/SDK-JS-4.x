import './App.css'
import '@arcgis/map-components/dist/components/arcgis-map'
import '@arcgis/map-components/components/arcgis-layer-list'
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import Query from '@arcgis/core/rest/support/Query'
import { useRef, useState } from 'react'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'

function App() {
  const [mapa, setMapa] = useState<HTMLArcgisMapElement>()
  const [capa, setCapa] = useState<FeatureLayer>()
  const [capaGrafica, setCapaGradica] = useState<GraphicsLayer>()

  const mapaRef = useRef<HTMLArcgisMapElement>(null)

  function mapClickHandler(clickEvent) {
    capaGrafica?.removeAll()

    const puntoEvento = clickEvent.detail.mapPoint

    const parametrosQuery = new Query({
      geometry: puntoEvento,
      spatialRelationship: 'intersects',
      distance: 10,
      units: 'kilometers',
      returnGeometry: true
    })

    capa?.queryFeatures(parametrosQuery).then((resultadosQuery) => {
      const entidades = resultadosQuery.features

      entidades.map((entidad) => {
        entidad.symbol = {
          type: 'simple-marker',
          color: 'red'
        }

        capaGrafica?.add(entidad)
      })
    })
  }

  function setMapHandler() {
    if (mapaRef.current) {
      const mapa: HTMLArcgisMapElement = mapaRef.current

      const capaHospitalesFL = new FeatureLayer({
        url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/arcgis/rest/services/Hospitales/FeatureServer',
        title: 'Hospitales de España'
      })

      const capaGraficaResultados = new GraphicsLayer({
        title: 'Hospitales Seleccionados'
      })

      setCapaGradica(() => capaGraficaResultados)

      setCapa(() => capaHospitalesFL)

      mapa.addLayer(capaHospitalesFL)
      mapa.addLayer(capaGraficaResultados)

      setMapa(() => mapa)
    }
  }

  return (
    <>
      <arcgis-map
        basemap="arcgis/dark-gray"
        center={[-3.6, 40.4]}
        zoom={5}
        ref={mapaRef}
        onarcgisViewReadyChange={setMapHandler}
        onarcgisViewClick={mapClickHandler}
      >
        <arcgis-layer-list position="bottom-left"></arcgis-layer-list>
      </arcgis-map>
    </>
  )
}

export default App
