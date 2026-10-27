import styled from "styled-components";
import {useState,useEffect} from "react";
import SearchResult from "./components/SearchResults/SearchResult";
const BASE_URL="http://localhost:9000";



const App = () => {

const[data,setData]=useState(null);

const[loading,setLoading]=useState(false);
const [filteredData,setFilteredData]=useState(null);
const[error,setError]=useState(null);
const[SelectedButton,setSelectedButton]=useState("All");

useEffect(()=>{
  const fetchFoodData=async ()=>{

  setLoading(true);
try{
  const response=await fetch(BASE_URL);
  const jsonData= await response.json();
  setLoading(false);
  setData(jsonData);
}
catch(error){
  setError("Unable to fetch data");
}   
};
fetchFoodData();
},[]);

const searchFood=(e)=>{
  const searchValue=e.target.value;
  if(searchValue.trim()===""){
    setFilteredData(null);
  }
  const filter=data?.filter((food) => food.name.toLowerCase().includes(searchValue.toLowerCase()));

  setFilteredData(filter);
};
const filterFood=(type)=>{
  if(type==="All"){
    setFilteredData(data);
    setSelectedButton("All");
    return ;
  }
     const filter=data?.filter((food)=> food.type.toLowerCase()===type.toLowerCase());  
  setFilteredData(filter);
  setSelectedButton(type);
};

 if(error){
  return <div>{error}</div>
 }
 if(loading){
  return <div>Loading...</div>
 }

  return (
    <> 
  <Container>
  <TopContainer>
       <div className="logo">
        <img src="/logo.svg" alt="logo" />
       </div>
       <div className="search">
          <input onChange={searchFood}
           placeholder="Search for food..." 
          />  
       </div>
    </TopContainer>

    <FilterContainer>
      <Button onClick={() => filterFood("All")}>All</Button>
      <Button onClick={() => filterFood("Breakfast")}>Breakfast</Button>
      <Button onClick={() => filterFood("Lunch")}>Lunch</Button>
      <Button onClick={() => filterFood("Dinner")}>Dinner</Button>
    </FilterContainer>
     
  </Container>
   <SearchResult data={filteredData ?? data}/>
  </>
  );
};

export default App;

const Container= styled.div`
  max-width: 1200px;
  margin: 0 auto;
`
const TopContainer=styled.section`
  min-height: 140px;
  display: flex;
  justify-content: space-between;
  align-items: center;

.search{
  input{
    background-color:transparent;
    border: 1px solid red;
    color:white;
    border-radius: 5px;
    height: 40px;
     font-size:16px;
     padding: 0 10px;
  }
}
`

const FilterContainer=styled.section`
display: flex;
justify-content: center;
gap:13px;
padding-bottom: 20px;
`

const Button=styled.button`
background-color: #ff4343;
border-radius: 5px;
padding: 6px 12px;
border: none;
color:white
`

