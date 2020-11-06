import React, { useEffect, useState,useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { auth } from "../firebase";
import EmpleadosForm from "./EmpleadosForm";
import { Router, Link } from "@reach/router";
import { db } from "../firebase.js";
import { toast } from "react-toastify";

const Empleados = () => {
  const user = useContext(UserContext);

  const { photoURL, displayName, email } = user;
  console.log(" Usuario ProfilePage : " + displayName + " - " + email);

  const signOut = () => {
    auth.signOut();  
  };
  const [Empleados, setEmpleados] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const getEmpleados = async () => {
    db.collection("Empleados").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setEmpleados(docs);
    });
  };

  const onDeleteEmpleado = async (id) => {
    if (window.confirm("Seguro de eliminar empleado?")) {
      await db.collection("Empleados").doc(id).delete();
      toast("Se elimino un Empleado", {
        type: "error",
        //autoClose: 2000
      });
    }
  };

  useEffect(() => {
    getEmpleados();
  }, []);

  const addOrEditEmpleado = async (EmpleadoObject) => {
    try {
      if (currentId === "") {
        await db.collection("Empleados").doc().set(EmpleadoObject);
        toast("Se agrego un Empleado", {
          type: "success",
        });
      } else {
        await db.collection("Empleados").doc(currentId).update(EmpleadoObject);
        toast("Se actualizo un Empleado", {
          type: "info",
        });
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>    
     <div>
      <nav className="navbar navbar-expand-lg navbar-light"className="bg-green-300">
       
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">Empresa</a>
          </div>
          <ul className="nav navbar-nav">
            <li className="active"><Link to="/">Inicio</Link></li>
            <button className="btn btn-danger" onClick={() => { signOut() }}>
              Cerrar Sesion</button>
          </ul>
        </div>
      </nav>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            
          <div className="col-md-4 p-2">
        <EmpleadosForm {...{ addOrEditEmpleado, currentId, Empleados }} />
      </div>

      <div className="col-md-8 p-2">
        <div class="container">
          <h1>Lista Empleados</h1>
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Nombre Empleado:</th>
                <th>Horas:</th>
                <th>Sueldo Base $:</th>
                <th>Sueldo ISSS $:</th>
                <th>Sueldo AFP $:</th>
                <th>Sueldo RENTA $:</th>
                <th>Sueldo Neto $:</th>
                <th>Aciones</th>
              </tr>
            </thead>
            <tbody>
              {Empleados.map((Empleado) => (
                <tr key={Empleado.id}>
                  <td>{Empleado.nombre}</td>
                  <td>{Empleado.horas}</td>
                  <td>{Empleado.sueldoB}</td>
                  <td>{Empleado.ISSS}</td>
                  <td>{Empleado.AFP}</td>
                  <td>{Empleado.RENTA}</td>
                  <td>{Empleado.sueldoN}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => setCurrentId(Empleado.id)}>Editar</button>
                    &nbsp;
                    &nbsp;
                    <button className="btn btn-danger" onClick={() => onDeleteEmpleado(Empleado.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
            
          </div>
        </div>
      </div>
          </div>
     
    </>
  );
};

export default Empleados;

