
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DriverDashboard from '../components/DriverDashboard'


const DriverDashBoardPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Driver Dashboard</h1>
        <p className="text-lg">Welcome to your dashboard!</p>        
      </div>

      <DriverDashboard/>
      <Footer />
    </>
  )
}

export default DriverDashBoardPage