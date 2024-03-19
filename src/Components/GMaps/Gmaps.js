import React from "react";

export default function MapLocation({ locationInfo }) {
  const top = "112px";
  const height = `calc(100vh - ${top})`;
  const zoomLevel = 13;
  // const locationUri = encodeURIComponent(locationInfo?.tenViTri)

  return (
    <div className="sticky w-full" data-aos="flip-down" style={{ top, height }}>
      <div className="mapouter w-full" style={{ height }}>
        <div className="gmap_canvas w-full" style={{ height }}>
          <iframe
            title="gmap"
            src={`https://maps.google.com/maps?q=${locationInfo}&t=&z=${zoomLevel}&ie=UTF8&iwloc=&output=embed`}
            frameBorder={0}
            scrolling="no"
            style={{ width: "100%", height: "100%" }}
          />
          <style
            dangerouslySetInnerHTML={{
              __html:
                ".mapouter{position:relative;background:#fff;} .maprouter a{color:#fff !important;position:absolute !important;top:0 !important;z-index:0 !important;}",
            }}
          />
          <style
            dangerouslySetInnerHTML={{
              __html:
                ".gmap_canvas{overflow:hidden}.gmap_canvas iframe{position:relative;z-index:2}",
            }}
          />
        </div>
      </div>
    </div>
  );
}
