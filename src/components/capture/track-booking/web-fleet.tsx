/** 1600×900 Track booking operator console — fleet management. */

import { trackBookingFonts } from "@/components/capture/capture-fonts";
import { TrackBookingWebConsoleChrome } from "@/components/capture/track-booking/web-console-chrome";

const vehicles = [
  { code: "GT3", name: "Porsche 911 GT3 R", num: "#07", track: "Apex Raceway", status: "track", miles: "1,240 mi" },
  { code: "GT4", name: "BMW M4 GT4", num: "#12", track: "Apex Raceway", status: "track", miles: "890 mi" },
  { code: "F4", name: "Tatuus F4-T014", num: "#21", track: "Ridge Motorsport", status: "pit", miles: "420 mi" },
  { code: "GT4", name: "Mercedes-AMG GT4", num: "#05", track: "Coastal Loop", status: "serv", miles: "2,110 mi" },
  { code: "RAD", name: "Radical SR3 XXR", num: "#33", track: "Thunderhill", status: "ready", miles: "760 mi" },
  { code: "GT3", name: "McLaren 720S GT3", num: "#02", track: "High Desert", status: "ready", miles: "540 mi" },
];

const statusClass: Record<string, string> = {
  track: "track",
  pit: "pit",
  serv: "serv",
  ready: "ready",
};

const statusLabel: Record<string, string> = {
  track: "On track",
  pit: "In pit",
  serv: "Service",
  ready: "Available",
};

export function TrackBookingWebFleetCapture() {
  return (
    <div className={`th-capture-root ${trackBookingFonts}`}>
      <TrackBookingWebConsoleChrome
        ariaLabel="Track booking fleet management"
        activeNav="fleet"
        activeSidebar="fleet"
      >
        <div className="ophead">
          <div>
            <div data-h="2">Fleet management</div>
            <p>38 vehicles · 5 tracks · assignments and service status</p>
          </div>
          <div className="ophead-right">
            <button type="button" className="btn-ghost">
              Export roster
            </button>
            <button type="button" className="btn-primary">
              Assign vehicle
            </button>
          </div>
        </div>

        <div className="fleet-toolbar">
          <div className="seg">
            <span className="on">All</span>
            <span>On track</span>
            <span>Available</span>
            <span>Service</span>
          </div>
          <div className="fleet-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-4-4" />
            </svg>
            Search by car, number, or track
          </div>
        </div>

        <div className="fleet-grid">
          {vehicles.map((vehicle) => (
            <div key={vehicle.num} className="fleet-card">
              <div className="fleet-card-top">
                <div className="car">{vehicle.code}</div>
                <span className={`pill ${statusClass[vehicle.status]}`}>{statusLabel[vehicle.status]}</span>
              </div>
              <b>{vehicle.name}</b>
              <span className="fleet-card-meta">
                {vehicle.num} · {vehicle.track}
              </span>
              <div className="fleet-card-foot">
                <span>{vehicle.miles} since service</span>
                <button type="button" className="btn-ghost fleet-card-btn">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </TrackBookingWebConsoleChrome>
    </div>
  );
}
