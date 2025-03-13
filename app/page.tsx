import { MapComponent } from "@/components/mapcontents/GoogleMaps";
import { GoogleMapProvider } from "@/components/providers/GoogleMapProvider";

export default function Home() {
  return (
    <GoogleMapProvider>
      <MapComponent />
    </GoogleMapProvider>
  );
}
