import "./Dash.css";
import { Button, Grid, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";


export default function DashboardData({ setIsLogin }) {

  const navigate = useNavigate();
  const [getdata, setGetdata] = useState([]);
  const [data, setData] = useState({
    title: "",
    Discription: "",
  });

  const change = (e) => {
    const { value, name } = e.target;
    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  const get = async () => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get(`http://localhost:5252/note`, {
        headers: {
          Authorization: token
        },
      });

      setGetdata(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`http://localhost:5252/note/${id}`);
        get();
        toast.success("Data is Deleted , Successfully...!");
        setData({
          title: "",
          Discription: "",
        });
      } catch (error) {
        toast.warning(error);
      }
    }
  };
  // updet
  const [selectid, setSelectid] = useState(0);
  const [show, setShow] = useState(false);

  const handleShow = (id) => {
    const newData = getdata.filter((user) => {
      return id === user._id;
    });
    setShow(true);
    setSelectid(id);
    setData({
      title: newData.map((user) => user.title),
      Discription: newData.map((user) => user.Discription),
    });
  };
  const handleUpdate = async () => {
    if (data.title.trim() === "" || data.Discription.trim() === "") {
      toast.error("Sorry 🤨 Enter Data");
      return;
    }
    try {
      await axios.put(`http://localhost:5252/note/${selectid}`, data);
      toast.success("data is Updated");
      setShow(false);

      get();
    } catch (error) {
      console.log(error);
    }

    setData({
      title: "",
      Discription: "",
    });
  };
  const Notes = () => {
    navigate("/notes");
  };

  const Logout = () => {

    setIsLogin(false);
    localStorage.clear();
    navigate("/login");
    toast.success("Logout successfully completed.");
  }


  return (
    <div className="App">
      <div className="main-box">
        <div className="main">
          <div>
            <h1>Notes</h1>
          </div>
          <button className="btn btn-secondary buttonLogOut" onClick={() => Logout()}>Logout</button>
          <div>
            <ToastContainer position="bottom-right" />
          </div>
        </div>
        <hr />
        <div className="input-main-box">
          <Grid container spacing={5}>
            {show ? (
              <>
                <Grid item xs={6}>
                  <TextField
                    className="inputfield"
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    onChange={change}
                    name="title"
                    value={data.title}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    className="inputfield"
                    label="Discription"
                    variant="outlined"
                    onChange={change}
                    name="Discription"
                    value={data.Discription}
                  />
                </Grid>
              </>
            ) : null}
            <Grid item xs={12}>
              <Button color="success" onClick={show ? handleUpdate : Notes} variant="contained">
                {show ? "Update" : "Create Notes"}
              </Button>
            </Grid>
          </Grid>
        </div>
        {/* Print Data */}
        <div className="getdata">
          {getdata.length > 0 ? (
            <>
              <Grid className="grid" container spacing={5}>
                {getdata.map((user, index) => (
                  <>
                    <Grid item xs={2.4}>
                      <div className="card" key={index}>

                        <text>{index + 1}.</text>
                        <h4> {user.title}</h4>
                        <p>{user.Discription}</p> <br />
                        <div className="edit">
                          <EditIcon color="success"
                            onClick={() => handleShow(user._id)} />
                          <span className="delete">
                            <DeleteIcon color="error"
                              onClick={() => handleDelete(user._id)} />
                          </span>
                        </div>
                      </div>
                    </Grid>
                  </>
                ))}
              </Grid>
            </>
          ) : (
            <div className="emptydata">
              Sorry, No Data.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
