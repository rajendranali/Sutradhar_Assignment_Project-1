import React,{useState} from 'react'
import Checkbox from '@mui/material/Checkbox';
//import ListComponent from './ListComponent';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';


function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
  }
  function absent(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
  }
 var disable=false
const MainComponent = () => {
    //array creation
    let arr=[]
    for(let i = 0; i <20;i++){
      arr.push(i)
    }
    const [check,setChecked]= useState("")                  //move or copy 
    const [checkedbox, setCheckedbox] = React.useState([]);    // chebox of items
    const [leftitem,setleftItems]=useState([])                 //leftItem
    const [rightItem,setrightItems]=useState(arr)              //rightItem

    //const [checkitem,setCheckItem]=useState("")

console.log(check)
    // check item name
    // if(check){
    //     setCheckItem(check.target.name)
    // }
    //console.log("hello",checkitem)
    // check for intersection
    const leftChecked = intersection(checkedbox, leftitem);
    const rightChecked = intersection(checkedbox, rightItem);

    // all item transfer

    const TransferAllright=()=>{
       
        if(check=="move"){
            setrightItems(arr)
        setleftItems([])
        }
        else if(check==="copy"){
            setrightItems(arr)
        setleftItems([])
        }

    }
 
    //console.log(rightItem)
    const TransferAllleft=()=>{
        disable=true
       if(check==="copy"){
        setleftItems(rightItem)
        setrightItems(arr)
       }


    }
    // left  transfer function
    const handleRightCheck=()=>{
        if(check==="move"){
            setrightItems(rightItem.concat(leftChecked))
        setleftItems(absent(leftitem, leftChecked));
        setCheckedbox(absent(checkedbox, leftChecked));
    }
    else if(check==="copy"){
        
        setrightItems(rightItem.concat(leftChecked))
        setleftItems(absent(arr, leftChecked));
        setCheckedbox(absent(checkedbox, leftChecked));
    }
}
//right transfer function
           
const handleLeftCheck=()=>{
    setleftItems(leftitem.concat(rightChecked))
    setrightItems(absent(rightItem, rightChecked));
        setCheckedbox(absent(checkedbox, rightChecked));

}

    // toggle checked
    
    const handleCheck = (value) => () => {
        const currentIndex = checkedbox.indexOf(value);
        const newChecked = [...checkedbox];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setCheckedbox(newChecked);
      };
      const ListComponent = (items) => {
    
        return(<>
        <Paper sx={{ width: 350, height: 450, overflow: 'auto' ,overflowX:"hidden"}}>
        <List dense component="div" role="list">
          {items.map((value) => {
            const labelId = `transfer-list-item-${value}-label`;
    
            return (
              <ListItem
                key={value}
                role="listitem"
                button
                onClick={handleCheck(value)}
                sx={{"&:hover":{
                    backgroundColor: "skyblue",
                    transition:"1s",
                    transform:"scale(1.05)"
                }}}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checkedbox.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    disabled={disable}
                    inputProps={{
                      'aria-labelledby': labelId,
                    }}
                    style={{opacity:1,color:"green"}}
                    //disabled={checkedbox}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`List in array ${value + 1}`} />
              </ListItem>
            );
          })}
          <ListItem />
        </List>
      </Paper>
    );
    </>)
    }
    

  return (
    <div>
    <h1 style={{color:"grey"}}>Project 1</h1>
<div  style={{margin:"5%"}}>
    <div style={{textAlign:"left",marginLeft:"20%",marginBottom:"40px"}}>
    <Checkbox  defaultChecked color="success" checked={check} onChange={(e)=>setChecked(e.target.value) } value={"copy"} />
    <label htmlFor=""style={{color:"gray"}}>Copy</label>
    <Checkbox  defaultChecked color="success" checked={!check} onChange={(e)=>setChecked(e.target.value)} value={"move"} />
    <label htmlFor="" style={{color:"gray"}}>Move</label>
    </div>
  

  
    <Grid container spacing={4} justifyContent="center" alignItems="center"  >
        
      <Grid item>
      <div style={{border:"2px solid #1976d2",height:"50px",width:"60%",fontSize:"10px",marginLeft:"10%",backgroundColor:"#1976d2",borderRadius:"10px",marginBottom:"20px"}}><h1 style={{color:"white"}}>Master</h1> </div>
       <div style={{marginTop:"40px"}}> {ListComponent (rightItem)}</div></Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center" >
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={TransferAllright}
            disabled={leftitem.length === 0}
            aria-label="move all right"
          >
            ≪
          </Button>
          <Button
            sx={{ my: 0.7 }}
            variant="outlined"
            size="small"
             onClick={handleRightCheck}
             disabled={leftitem.length === 0}
            aria-label="move selected right"
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.7 }}
            variant="outlined"
            size="small"
             onClick={handleLeftCheck}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
             onClick={TransferAllleft}
             disabled={rightItem.length === 0}
            aria-label="move all left"
          >
            ≫
          </Button>
        </Grid>
      </Grid>
      <Grid item> <div style={{border:"2px solid #1976d2",height:"50px",width:"60%",fontSize:"10px",marginLeft:"10%",backgroundColor:"#1976d2",borderRadius:"10px",marginBottom:"20px"}}><h1 style={{color:"white"}}>New Elements</h1> </div><div style={{marginTop:"40px"}}>
      {ListComponent (leftitem)}</div></Grid>
    </Grid>
    </div>
    </div>
  )
}

export default MainComponent
