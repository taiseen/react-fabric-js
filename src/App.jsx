import CanvasState from './components/CanvasState'


const App = () => {

  return (
    // prevent from [ctrl + a] command to select all text
    <main className='w-full h-screen bg-gray-300 select-none'>

      <h1 className="mx-auto text-2xl font-bold w-fit py-4">
        Fabric Js + React
      </h1>

      <section className='mx-auto py-2 w-fit'>
        <CanvasState />
      </section>

      {/* <CanvasLine /> */}
      {/* <CanvasState /> */}
    </main>
  )
}

export default App