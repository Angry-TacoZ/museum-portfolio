export function MuseumLighting() {
  return (
    <>
      <ambientLight intensity={0.34} color="#dfe4d7" />
      <directionalLight position={[3, 8, 5]} intensity={1.1} color="#ffdfaa" castShadow shadow-mapSize={[1024, 1024]} />
      <spotLight position={[-5.8, 5.2, 0]} target-position={[-5.8, 1, -3]} angle={0.52} penumbra={0.82} intensity={34} color="#ffd9a0" />
      <spotLight position={[0, 5.2, -8]} target-position={[0, 1, -11]} angle={0.52} penumbra={0.82} intensity={34} color="#ffd9a0" />
      <spotLight position={[5.8, 5.2, -16]} target-position={[5.8, 1, -19]} angle={0.52} penumbra={0.82} intensity={38} color="#ffd6a0" />
      <pointLight position={[5.8, 2.3, -27]} intensity={22} distance={8} color="#ffc070" />
    </>
  )
}
