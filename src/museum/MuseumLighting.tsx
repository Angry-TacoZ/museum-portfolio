export function MuseumLighting() {
  return (
    <>
      <hemisphereLight intensity={1.45} color="#ffffff" groundColor="#b8b6af" />
      <ambientLight intensity={0.78} color="#f7f5ed" />
      <directionalLight position={[3, 8, 5]} intensity={1.8} color="#fffdf6" castShadow shadow-mapSize={[1024, 1024]} />
      <spotLight position={[-5.8, 5.2, 0]} target-position={[-5.8, 1, -3]} angle={0.58} penumbra={0.88} intensity={14} color="#eef7fa" />
      <spotLight position={[0, 5.2, -8]} target-position={[0, 1, -11]} angle={0.58} penumbra={0.88} intensity={14} color="#eef7fa" />
      <spotLight position={[5.8, 5.2, -16]} target-position={[5.8, 1, -19]} angle={0.58} penumbra={0.88} intensity={16} color="#eef7fa" />
      <pointLight position={[5.8, 2.3, -27]} intensity={10} distance={8} color="#d8edf5" />
    </>
  )
}
