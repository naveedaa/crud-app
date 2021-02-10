import * as React from "react"
import Todos from '../components/Todos'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const baseURL = ".netlify/functions/crudApp/";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            textAlign:'center',
        },
        parent:{
          textAlign:'center'
        }
    }),
);

const IndexPage = () => {

  const classes=useStyles();

  return (
    <div className={classes.parent}>
      <title>Todos</title>
      <h1 style={{marginTop: '150px', color: 'darkslategrey', letterSpacing: '3px'}}>Crud App</h1>
      <Todos/>
  
    </div>
  )
}

export default IndexPage