// 1 degree lat ~= 111km. 1 degree lng ~= 111km * cos(lat)
const METERS_PER_DEGREE = 111000; 

function getRandomLocation(centerLat, centerLng, radiusKm) {
    const r = radiusKm / 111.32; // Convert km to degrees roughly
    const u = Math.random();
    const v = Math.random();
    const w = r * Math.sqrt(u);
    const t = 2 * Math.PI * v;
    const x = w * Math.cos(t);
    const y = w * Math.sin(t);
    
    // Adjust longitude for latitude shrinking
    const newLat = x + centerLat;
    const newLng = y / Math.cos(centerLat * (Math.PI / 180)) + centerLng;

    return { latitude: newLat, longitude: newLng };
}

function getDistance(p1, p2) {
    const R = 6371e3; // metres
    const φ1 = p1.latitude * Math.PI/180;
    const φ2 = p2.latitude * Math.PI/180;
    const Δφ = (p2.latitude - p1.latitude) * Math.PI/180;
    const Δλ = (p2.longitude - p1.longitude) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
}

function interpolate(start, end, progress) {
    return {
        latitude: start.latitude + (end.latitude - start.latitude) * progress,
        longitude: start.longitude + (end.longitude - start.longitude) * progress
    };
}

module.exports = { getRandomLocation, getDistance, interpolate };