import './App.css'
import { ArcgisMap, ArcgisSearch, ArcgisLegend } from "@arcgis/map-components-react";
import { defineCustomElements } from "@arcgis/map-components/dist/loader";
defineCustomElements(window, { resourcesUrl: "https://js.arcgis.com/map-components/4.29/assets" });

function App() {

  return (
    <>
      <ArcgisMap itemId = '67672f754f654b1b8965734404ff599f'>
        <ArcgisSearch position="top-right"></ArcgisSearch>
        <ArcgisLegend position="bottom-left"></ArcgisLegend>
      </ArcgisMap>
    </>
  )
}

export default App
