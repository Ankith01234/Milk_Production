import React, { useEffect, useState } from 'react';
import './Adminaccount.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './Graph.css';

export default function MilkBoothStock() {

  const [stocks, setstocks] = useState([]);

  useEffect(() => {
    getStocks();
  }, [])

  function getStocks()
  {
    var mkid = sessionStorage.getItem('userid');

    axios.get(`http://localhost:8080/getStocksData/${mkid}`)
      .then((res) => {
        if (typeof res.data === 'object')
        {
          setstocks(res.data);
          console.log(stocks);
        }
        else
          toast.error(res.data);
      })

  }

  return (
    <div className='container'>
      <div className='row align-items-center '>
        <div className='col-7 justify-content-center'>
          <h4 className='heading'>Stocks</h4>
          <div>
            <table className='table text-center'>
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Product Quantity</th>
                </tr>
              </thead>
              <tbody>
                {
                  stocks.map((item) => {
                    return (
                      <tr>
                        <td>{item.mp.pid}</td>
                        <td>{item.mp.productname}</td>
                        <td>{item.productqty}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className='col-5 justify-content-center'>
          <div>
            <div className='mb-5 mt-3'>
              <BarChart width={400} height={350} data={stocks} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mp.productname" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="productqty" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                {/* <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} /> */}
              </BarChart>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}
