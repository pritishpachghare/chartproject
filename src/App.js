import './App.css'
import PieChartForCount from './component/PieChartForCount';
import BarChartForCount from './component/BarChartForCount';
import Graph from './component/Graph';

function App() {
  return (
    <div className="flex justify-center App-header">
      <h1 className='font-bold'>Graph And Chart</h1>
    <div className='flex md:flex-row flex-col m-2'>
    <PieChartForCount/>
     <BarChartForCount/>
     <Graph/>
    </div>
   
    </div>
  );
}

export default App;
