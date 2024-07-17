import { convertToAbbreviation, toSlug } from "@/lib/utils";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  OverlayView,
  OverlayViewF,
  useJsApiLoader,
} from "@react-google-maps/api";
import React from "react";
import SlideListingPage from "../slides/SlideListingPage";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function TestGGmap1({ data }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GG_MAP_KEY,
  });

  const [map, setMap] = React.useState(null);
  const center = {
    lat: parseFloat(data[0]?.latitude),
    lng: parseFloat(data[0]?.longitude),
  };

  const [selectedPlace, setSelectedPlace] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    map.setZoom(13);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  // const getPixelPositionOffset = (offsetWidth, offsetHeight, labelAnchor) => {
  //   return {
  //     x: offsetWidth + labelAnchor.x,
  //     y: offsetHeight + labelAnchor.y,
  //   };
  // };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    
    >
      {data?.map((item) => (
        <>
          <MarkerF
            key={item.id}
            position={{
              lat: parseFloat(item?.latitude),
              lng: parseFloat(item?.longitude),
            }}
            onClick={() => setSelectedPlace(item)}
            // label={item.name}
          />

          <OverlayViewF
            key={item.id}
            position={{
              lat: parseFloat(item?.latitude),
              lng: parseFloat(item?.longitude),
            }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            // getPixelPositionOffset={(x, y) =>
            //   getPixelPositionOffset(x, y, { x: -64, y: 4 })
            // }
          >
            <div className="min-w-40">
              <div className="w-fit px-2 text-center rounded-full bg-white text-slate-800 font-semibold p-1 shadow-lg">
                {item.roomPriceFrom.toLocaleString() +
                  "đ - " +
                  item.roomPriceTo.toLocaleString() +
                  "đ"}
              </div>
            </div>
          </OverlayViewF>

          {selectedPlace && (
            <InfoWindowF
              position={{
                lat: parseFloat(selectedPlace.latitude),
                lng: parseFloat(selectedPlace.longitude),
              }}
              zIndex={1}
              options={{
                pixelOffset: {
                  width: 0,
                  height: -40,
                },
              }}
              onCloseClick={() => setSelectedPlace(null)}
            >
              <div className="">
                <ListItem data={selectedPlace} />
              </div>
            </InfoWindowF>
          )}
        </>
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
}

const ListItem = ({ data }) => {
  return (
    <div className="rounded cursor-pointer relative">
      <a href={`/motel/${toSlug(data.name)}-${data.id}`} target="_blank">
        <div>
          <div className="h-[100px]">
            {/* swiper */}
            <SlideListingPage mainImage={data.image} images={data.photos} />
          </div>
          <div className="p-1 pt-1.5">
            <div className="flex justify-between">
              <p className="text-xs uppercase">{data.phone}</p>
              <div className="flex flex-wrap text-xs gap-x-1">
                <span className="flex items-center after-dot-break">
                  {data.roomAcreageFrom} m<sup>2</sup>
                </span>
                <span className="flex items-center">
                  {data.roomAcreageTo} m<sup>2</sup>
                </span>
                {/* <span className="flex gap-x-1 items-center">
                  1 <PiBathtubThin size={16} color="slate" />
                </span> */}
              </div>
            </div>
            <p className="mt-1 font-medium text-xl">{data.name}</p>
            <p className="text-sm text-slate-400">{data.address}</p>
            <div className="justify-between">
              <div className="flex mt-2 items-baseline text-xl md:text-2xl  text-teal-500 ">
                {convertToAbbreviation(data.roomPriceFrom)} -{" "}
                {convertToAbbreviation(data.roomPriceTo)} VND /{" "}
                <span className="text-sm">tháng</span>
              </div>{" "}
              <p className="text-teal-500 mt-1 ml-1 text-xs capitalize">
                Utilities included
              </p>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};
