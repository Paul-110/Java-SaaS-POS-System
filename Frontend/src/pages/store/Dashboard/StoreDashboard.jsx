import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import StoreSidebar from "./StoreSidebar";
import StoreTopbar from "./StoreTopbar";
import { useDispatch, useSelector } from "react-redux";
import { getStoreByAdmin } from "../../../Redux Toolkit/features/store/storeThunks";

const StoreDashboard = () => {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.user);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (userProfile?.id) {
      dispatch(getStoreByAdmin());
    }
  }, [dispatch, userProfile]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="flex h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 opacity-60" style={{ perspective: '1000px' }}>
        <div className="absolute inset-0 transition-transform duration-500 ease-out" style={{ transform: `translateX(${mousePosition.x * -15}px) translateY(${mousePosition.y * -15}px)` }}><div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500/70 rounded-full filter blur-3xl animate-blob"></div></div>
        <div className="absolute inset-0 transition-transform duration-500 ease-out" style={{ transform: `translateX(${mousePosition.x * 20}px) translateY(${mousePosition.y * 20}px)` }}><div className="absolute top-0 -right-4 w-72 h-72 bg-emerald-500/70 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div></div>
        <div className="absolute inset-0 transition-transform duration-500 ease-out" style={{ transform: `translateX(${mousePosition.x * -25}px) translateY(${mousePosition.y * -25}px)` }}><div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-500/70 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div></div>
        <div className="absolute inset-0 transition-transform duration-500 ease-out" style={{ transform: `translateX(${mousePosition.x * 10}px) translateY(${mousePosition.y * 10}px)` }}><div className="absolute -bottom-24 right-20 w-96 h-96 bg-teal-500/60 rounded-full filter blur-3xl animate-blob animation-delay-3000"></div></div>
        <div className="absolute inset-0 transition-transform duration-500 ease-out" style={{ transform: `translateX(${mousePosition.x * -5}px) translateY(${mousePosition.y * -5}px)` }}><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/50 rounded-full filter blur-3xl animate-blob animation-delay-5000"></div></div>
      </div>
      <style>{`@keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } } .animate-blob { animation: blob 7s infinite; } .animation-delay-2000 { animation-delay: 2s; } .animation-delay-3000 { animation-delay: 3s; } .animation-delay-4000 { animation-delay: 4s; } .animation-delay-5000 { animation-delay: 5s; }`}</style>

      <StoreSidebar />
      <div className="flex-1 flex flex-col overflow-hidden z-10">
        <StoreTopbar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StoreDashboard;
