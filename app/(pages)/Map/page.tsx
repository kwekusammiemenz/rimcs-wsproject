import { MapComponent } from "@/src/components/Geography/GoogleMaps";
import { GoogleMapProvider } from "@/src/providers/GoogleMapProvider";

export default function GeographyPage() {
  return (
    <GoogleMapProvider>
      <MapComponent />
    </GoogleMapProvider>
  );
}
