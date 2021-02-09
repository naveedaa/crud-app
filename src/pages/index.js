  
import React, { useState, useEffect } from "react"
import axios from "axios"
import { Box, Button, makeStyles, TextField } from "@material-ui/core"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted"
import UpdateIcon from '@material-ui/icons/Update';

const useStyles = makeStyles(theme => ({
  root: {
    letterSpacing: "7px",
    backgroundColor: "pale",
    textAlign: "center",
    marginTop: "100px",
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}))

export default function Home() {
  const [todo, setTodo] = useState("")
  const [id, setId] = useState("")
  const [todos, setTodos] = useState([])
  const [isUpdate, setIsUpdate] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [adding, setAdding] = useState(false)
  const [removing, setRemoving] = useState(false)
  
  const classes = useStyles()

  useEffect(() => {
    (async () => {
      const result = await axios.get(`/.netlify/functions/getTodos`)
      setTodos(result.data)
    })()
  }, [removing, adding, updating])

  const handleSubmit = async () => {
    setAdding(true)
    const result = await axios.post(`/.netlify/functions/addTodos`, { todo })
    setAdding(false)
    setTodo("")
  }

  const handleDelete = async id => {
    setRemoving(true)
    const result = await axios.delete(`/.netlify/functions/deleteTodo`, {
      data: {
        id
      }
    })
    setRemoving(false)
    setTodo("")
  }

  const handleUpadte = async (todo, id) => {
    setUpdating(true)
    const result = await axios.put(`/.netlify/functions/updateTodo`, { todo, id })
    setIsUpdate(false)
    setUpdating(false)
    setTodo("")
  }

  return (
      <div className={classes.root}>
        <h1> Crud App </h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Box width="55%">
            <TextField
              value={todo}
              fullWidth
              variant="outlined"
              label={isUpdate ? "Update Todo" : "Add Todo"}
              onChange={e => setTodo(e.target.value)}
            />
          </Box>
          <Button onClick={() => {
            { isUpdate ? (
              handleUpadte(todo, id)
            ) : (
              handleSubmit()
            )}
          }}> {isUpdate ? "UPDATE" : "ADD"} </Button>
          {adding && <p style={{ fontWeight: "bold" }}>adding data ...</p>}
          {updating && <p style={{ fontWeight: "bold" }}>updating data ...</p>}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className={classes.title}></Typography>
            <div className={classes.demo}>
              <List>
                {todos.map(item => {
                  return (
                    <ListItem key={item.ref["@ref"].id}>
                      <ListItemAvatar>
                        <Avatar>
                          <FormatListBulletedIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText> {item.data.todo} </ListItemText>
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => {
                            handleDelete(item.ref["@ref"].id)
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="update"
                          onClick={() => {
                            setIsUpdate(true)
                            setId(item.ref["@ref"].id)
                          }}
                          >
                          <UpdateIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )
                })}
              </List>
              {removing && (
                <p style={{ fontWeight: "bold" }}>removing data ...</p>
              )}
            </div>
          </Grid>
        </div>
      </div>
  )
}




