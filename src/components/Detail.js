// SuperReports.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, Button } from '@mui/material';
import images from '../feature/image/icons8-sort-24.png'
import { Link } from 'react-router-dom';
const calculateTotals = (reports) => {
  let total1 = 0; // for positive degrees
  let total2 = 0; // for negative degrees

  reports.forEach((report) => {
    total1 += Math.max(0, report.degree); // Add positive degree
    total2 += Math.min(0, report.degree); // Add negative degree
  });

  return { total1, total2 };
};
const SuperReports = ({ data }) => {
  const [sortedData, setSortedData] = useState(data);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortKey, setSortKey] = useState(null);
  const [currentSubreports, setCurrentSubreports] = useState(null);

  const { id } = useParams();
console.log('data', data);
  // Find the report with the matching ID
  const report = data.find((item) => item.id.toString() === id);
console.log("report", report.subreports);
  if (!report) {
    // Handle the case when the report with the specified ID is not found
    return <div>Report not found</div>;
  }

  // const { superreports } = report;
  const handleSort = (key) => {
    const direction = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';

    const sorted = [...sortedData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setSortedData(sorted);
    setSortDirection(direction);
    setSortKey(key);
  };

  const { total1, total2 } = calculateTotals(data);

  const determineOpacity = (percentage) => {
    return (Math.abs(percentage / 100));

  }; 
  const determineBackgrounColor=(percentage)=>{
    let backgroundColor='white';
    let color='white'
    if(percentage > 50){
      backgroundColor='green'
      color='black'
    }else{
      backgroundColor='red'
      color='white'
    }
    return (backgroundColor)
  }
const handleDtaas=(keys)=>{
  console.log(keys);
  setCurrentSubreports(keys)
}
  
  return (
    <div>
      <Button variant="contained">
      <Link to={`/`}>Go back</Link>

      </Button>
    
    <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell onClick={() => handleSort('id')}>ID
              
              <img src={images} alt="Image" style={{ width: '15px', height: '15px' }}/>
              </TableCell>
              <TableCell >Name
              </TableCell>
              <TableCell onClick={() => handleSort('price')}>Price
              <img src={images} alt="Image" style={{ width: '15px', height: '15px' }}/>
              </TableCell>
              <TableCell onClick={() => handleSort('degree')}>Degree
              <img src={images} alt="Image" style={{ width: '15px', height: '15px' }}/>
              </TableCell>
              <TableCell >Percentage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report.subreports.map((item) => {
              const percentage = item.degree > 0 ? (item.degree / total1) * 100 : (item.degree / total2) * 100;
              const opacity = determineOpacity(percentage);
              const backgroundColor = determineBackgrounColor(percentage);
              const textColor = opacity > 0.5 ? 'black' : 'white';
              return (
                <TableRow key={item.id} >
                  <TableCell >
                  <Link to={`/details/${item.id}/${item.id}`}>

                    <img src={item.image} alt={`Image for ${item.name}`} style={{ width: '50px', height: '50px' }} />
                  </Link>
                  </TableCell>

                  <TableCell onClick={()=>handleDtaas(item.subreports)}>
                  <Link to={`/details/:id/${item.id}`}>{item.id}</Link>

</TableCell>
                  <TableCell>
                  <Link to={`/details/:id/${item.id}`}>{item.name}</Link>
                    
                    </TableCell>
                  <TableCell> <Link to={`/details/:id/${item.id}`}>{item.price}</Link></TableCell>
                  <TableCell> <Link to={`/details/:id/${item.id}`}>{item.degree}</Link></TableCell>
                  {/* <TableCell style={ { opacity }}>{percentage.toFixed(2)}%</TableCell> */}
                  <TableCell style={{ opacity: determineOpacity(percentage) , backgroundColor : determineBackgrounColor(percentage), fontSize:'x-large'}}>
 <Link to={`/details/:id/${item.id}`} style={{color:textColor}}>
  {percentage.toFixed(2)}%
 </Link>
 
</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SuperReports;
