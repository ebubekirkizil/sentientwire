'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

// 40+ World Capitals for dense network feel
const BASE_CITIES = [
  { name: 'LONDON', lat: 51.5, lng: -0.1 },
  { name: 'NEW YORK', lat: 40.7, lng: -74.0 },
  { name: 'MOSCOW', lat: 55.7, lng: 37.6 },
  { name: 'BEIJING', lat: 39.9, lng: 116.4 },
  { name: 'TOKYO', lat: 35.6, lng: 139.6 },
  { name: 'SYDNEY', lat: -33.8, lng: 151.2 },
  { name: 'ANKARA', lat: 39.9, lng: 32.8 },
  { name: 'PARIS', lat: 48.8, lng: 2.3 },
  { name: 'BERLIN', lat: 52.5, lng: 13.4 },
  { name: 'ROME', lat: 41.9, lng: 12.5 },
  { name: 'DELHI', lat: 28.6, lng: 77.2 },
  { name: 'CAIRO', lat: 30.0, lng: 31.2 },
  { name: 'BRASILIA', lat: -15.8, lng: -47.9 },
  { name: 'OTTAWA', lat: 45.4, lng: -75.7 },
  { name: 'PRETORIA', lat: -25.7, lng: 28.2 },
  { name: 'SEOUL', lat: 37.5, lng: 126.9 },
  { name: 'RIYADH', lat: 24.7, lng: 46.7 },
  { name: 'JAKARTA', lat: -6.2, lng: 106.8 },
  { name: 'ATHENS', lat: 37.9, lng: 23.7 },
  { name: 'MADRID', lat: 40.4, lng: -3.7 },
  { name: 'STOCKHOLM', lat: 59.3, lng: 18.0 },
  { name: 'OSLO', lat: 59.9, lng: 10.7 },
  { name: 'HELSINKI', lat: 60.1, lng: 24.9 },
  { name: 'WARSAW', lat: 52.2, lng: 21.0 },
  { name: 'BANGKOK', lat: 13.7, lng: 100.5 },
  { name: 'MANILA', lat: 14.5, lng: 120.9 },
  { name: 'KUALA LUMPUR', lat: 3.1, lng: 101.6 },
  { name: 'WELLINGTON', lat: -41.2, lng: 174.7 },
  { name: 'NAIROBI', lat: -1.2, lng: 36.8 },
  { name: 'LAGOS', lat: 6.5, lng: 3.3 },
  { name: 'BUENOS AIRES', lat: -34.6, lng: -58.3 },
  { name: 'SANTIAGO', lat: -33.4, lng: -70.6 },
  { name: 'LIMA', lat: -12.0, lng: -77.0 },
  { name: 'BOGOTA', lat: 4.7, lng: -74.0 },
  { name: 'MEXICO CITY', lat: 19.4, lng: -99.1 },
  { name: 'WASHINGTON DC', lat: 38.9, lng: -77.0 },
  { name: 'HAVANA', lat: 23.1, lng: -82.3 },
  { name: 'TEHRAN', lat: 35.6, lng: 51.3 },
  { name: 'BAGHDAD', lat: 33.3, lng: 44.3 },
  { name: 'KABUL', lat: 34.5, lng: 69.1 },
  { name: 'ISLAMABAD', lat: 33.7, lng: 73.0 },
  { name: 'ASTANA', lat: 51.1, lng: 71.4 },
];

// Fixed connection arcs for background data traffic
const ARCS_DATA = [
  { startLat: 51.5, startLng: -0.1, endLat: 40.7, endLng: -74.0, color: ['#06b6d4', '#2dd4bf'] },
  { startLat: 51.5, startLng: -0.1, endLat: 55.7, endLng: 37.6, color: ['#2dd4bf', '#06b6d4'] },
  { startLat: 39.9, startLng: 116.4, endLat: 35.6, endLng: 139.6, color: ['#06b6d4', '#2dd4bf'] },
  { startLat: 39.9, startLng: 32.8, endLat: 48.8, endLng: 2.3, color: ['#2dd4bf', '#06b6d4'] },
  { startLat: 39.9, startLng: 32.8, endLat: 55.7, endLng: 37.6, color: ['#06b6d4', '#2dd4bf'] },
  { startLat: 28.6, startLng: 77.2, endLat: -33.8, endLng: 151.2, color: ['#2dd4bf', '#06b6d4'] },
  { startLat: -15.8, startLng: -47.9, endLat: 40.7, endLng: -74.0, color: ['#06b6d4', '#2dd4bf'] },
  { startLat: 30.0, startLng: 31.2, endLat: 24.7, endLng: 46.7, color: ['#2dd4bf', '#06b6d4'] },
  { startLat: 52.5, startLng: 13.4, endLat: -25.7, endLng: 28.2, color: ['#06b6d4', '#2dd4bf'] },
  { startLat: 35.6, startLng: 51.3, endLat: 39.9, endLng: 116.4, color: ['#2dd4bf', '#06b6d4'] },
];

export default function HeroGlobe({ size = 500 }: { size?: number }) {
  const globeEl = useRef<any>();
  const { theme } = useTheme();
  // Initial active alerts
  const [threats, setThreats] = useState<string[]>(['MOSCOW', 'BEIJING']);

  useEffect(() => {
    // Küçük bir gecikme ile WebGL motorunun tam yüklenmesini bekleyelim
    const timer = setTimeout(() => {
      if (globeEl.current) {
        // KULLANICI İSTEĞİ: Başlangıçta Akdeniz'i (Lat: 35, Lng: 18) ortalasın
        globeEl.current.pointOfView({ lat: 35, lng: 18, altitude: 2.2 }, 2000);
        
        const controls = globeEl.current.controls();
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.2;
        
        // KULLANICI İSTEĞİ: Yakınlaştırma (zoom) kesinlikle kapalı olsun.
        controls.enableZoom = false; 
        controls.enablePan = false; 
        controls.enableRotate = true; 
      }
    }, 1000);
    
    // Dünyanın sürekli dönmesini garantiye almak için her saniye kontrol edelim
    const rotateInterval = setInterval(() => {
      if (globeEl.current && globeEl.current.controls()) {
         globeEl.current.controls().autoRotate = true;
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(rotateInterval);
    };
  }, []);

  // Use a completely static reference so the Globe never re-renders and never stutters
  const displayCities = React.useMemo(() => {
    return BASE_CITIES.map(c => {
      return {
        ...c,
        displayName: c.name,
        color: '#2dd4bf',
        size: 0.035
      };
    });
  }, []);

  const allArcsData = React.useMemo(() => {
    return ARCS_DATA;
  }, []);

  return (
    <div style={{ width: size, height: size, position: 'relative' }} className="flex items-center justify-center">
      <Globe
        ref={globeEl}
        width={size}
        height={size}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl={theme === 'light' ? "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg" : "//unpkg.com/three-globe/example/img/earth-dark.jpg"}
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        
        // Enhance 3D depth and atmosphere
        bumpScale={15}
        atmosphereColor={theme === 'light' ? "#0284c7" : "#06b6d4"}
        atmosphereAltitude={0.15}
        
        // Enhance cities
        pointsData={displayCities}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointAltitude={0.03}
        pointRadius="size"
        pointsMerge={false}
        
        // Enhance labels
        labelsData={displayCities}
        labelLat="lat"
        labelLng="lng"
        labelText="displayName"
        labelSize={1.2}
        labelDotRadius={0.4}
        labelColor={(d: any) => d.color === '#ef4444' ? 'rgba(239, 68, 68, 0.95)' : 'rgba(45, 212, 191, 0.65)'}
        labelResolution={2}

        // Arcs (Fixed + Dynamic)
        arcsData={allArcsData}
        arcStartLat="startLat"
        arcStartLng="startLng"
        arcEndLat="endLat"
        arcEndLng="endLng"
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={1500}
      />
      {/* Kavisli Cam / Parlama Efekti */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-full"
        style={{ boxShadow: 'inset 0 0 60px rgba(6,182,212,0.15)' }}
      />
    </div>
  );
}
