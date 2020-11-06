import React, { useState, useEffect } from "react";
import { db } from "../firebase.js";
import { toast } from "react-toastify";
const sala=[];
const nom=[];
  let c=0;
  let ma=0;
  let me=0;
  let posMa=0;
  let posMe=0;
  let empMe=null;
  let empMa=null;
const EmpleadosForm = (props) => {

  
  const initialStateValues = {
    nombre: "",
    horas: "", 
    sueldoB: "",
    ISSS: "",
    AFP: "",
    RENTA: "",
    sueldoN: "",
  };

  const [values, setValues] = useState(initialStateValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.horas>0 && values.horas<=160) {
      values.sueldoB=values.horas*9.75;
      values.ISSS=values.sueldoB*0.0525;
      values.AFP=values.sueldoB*0.0688;
      values.RENTA=values.sueldoB*0.1;
      values.sueldoN=values.sueldoB-values.ISSS-values.AFP-values.RENTA;
      sala.push(values.sueldoN);
      nom.push(values.nombre);
      c++;
      console.log(c);
      if (c==3) {
        me=sala[0];
        ma=sala[0];
        posMa=1;
        posMe=1;
        empMa=nom[0];
        empMe=nom[0];
        for (let i = 0; i < sala.length; i++) {
          if (sala[i]>=ma) {
            ma=sala[i];
            empMa=nom[i];
            posMa=i+1;
          }
          else{
            if (sala[i]<me) {
              me=sala[i];
              empMe=nom[i];
              posMe=i+1;
            }
          }
         
        }
        toast("El salario mayor es: $"+ma+" del empleado "+empMa+" #"+posMa, {
          type: "info",
        });
        toast("El salario menor es: $"+me+" del empleado "+empMe+ " #"+posMe, {
          type: "warning",
        });
        console.log(ma);
        console.log(me);
        posMa=0;
        posMe=0;
        empMe=null;
        empMa=null;
        console.log(posMa);
        console.log(posMe);
        c=0;
      } 
      props.addOrEditEmpleado(values);
      setValues({ ...initialStateValues });
    } else if(values.horas>160 && values.horas<=200 ){
      values.sueldoB=160*9.75+((values.horas-160)*11.50);
      values.ISSS=values.sueldoB*0.0525;
      values.AFP=values.sueldoB*0.0688;
      values.RENTA=values.sueldoB*0.1;
      values.sueldoN=values.sueldoB-values.ISSS-values.AFP-values.RENTA;
      sala.push(values.sueldoN);
      nom.push(values.nombre);
      c++;
      console.log(c);
      if (c==3) {
        me=sala[0];
        ma=sala[0];
        posMa=1;
        posMe=1;
        empMa=nom[0];
        empMe=nom[0];
        for (let i = 0; i < sala.length; i++) {
          if (sala[i]>=ma) {
            ma=sala[i];
            empMa=nom[i];
            posMa=i+1;
          }
          else{
            if (sala[i]<me) {
              me=sala[i];
              empMe=nom[i];
              posMe=i+1;
            }
          }
         
        }
        toast("El salario mayor es: $"+ma+" del empleado "+empMa+" #"+posMa, {
          type: "info",
        });
        toast("El salario menor es: $"+me+" del empleado "+empMe+ " #"+posMe, {
          type: "warning",
        });
        console.log(ma);
        console.log(me);
        posMa=0;
        posMe=0;
        empMe=null;
        empMa=null;
        console.log(posMa);
        console.log(posMe);
        c=0;
      } 
      props.addOrEditEmpleado(values);
      setValues({ ...initialStateValues });
    } else if(values.horas>200 && values.horas<=250 ){
      values.sueldoB=160*9.75+((40)*11.50)+((values.horas-200)*12.50);
      values.ISSS=values.sueldoB*0.0525;
      values.AFP=values.sueldoB*0.0688;
      values.RENTA=values.sueldoB*0.1;
      values.sueldoN=values.sueldoB-values.ISSS-values.AFP-values.RENTA;
      sala.push(values.sueldoN);
      nom.push(values.nombre);
      c++;
      console.log(c);
      if (c==3) {
        me=sala[0];
        ma=sala[0];
        posMa=1;
        posMe=1;
        empMa=nom[0];
        empMe=nom[0];
        for (let i = 0; i < sala.length; i++) {
          if (sala[i]>=ma) {
            ma=sala[i];
            empMa=nom[i];
            posMa=i+1;
          }
          else{
            if (sala[i]<me) {
              me=sala[i];
              empMe=nom[i];
              posMe=i+1;
            }
          }
         
        }
        toast("El salario mayor es: $"+ma+" del empleado "+empMa+" #"+posMa, {
          type: "info",
        });
        toast("El salario menor es: $"+me+" del empleado "+empMe+ " #"+posMe, {
          type: "warning",
        });
        console.log(ma);
        console.log(me);
        posMa=0;
        posMe=0;
        empMe=null;
        empMa=null;
        console.log(posMa);
        console.log(posMe);
        c=0;
         const sala=null;
         const nom=null;
      } 
      props.addOrEditEmpleado(values);
      setValues({ ...initialStateValues });
    }
    
  };

  const getEmpleadoById = async (id) => {
    const doc = await db.collection("Empleados").doc(id).get();
    setValues({ ...doc.data() });
  };

  useEffect(() => {
    if (props.currentId === "") {
      setValues({ ...initialStateValues });
    } else {
      //https://stackoverflow.com/questions/56059127/how-to-fix-this-error-function-collectionreference-doc
      if (props.currentId !== null && props.currentId !== undefined) {
        getEmpleadoById(props.currentId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentId]);

  return (
    <form onSubmit={handleSubmit} className="card card-body border-primary">
      <div className="form-group input-group">
      <label>Nombre:</label>
        <input
          type="text"
          className="form-control"
          placeholder="Ingrese nombre"
          value={values.nombre}
          name="nombre"
          onChange={handleInputChange}
        />
      </div>


      <div className="form-group input-group">
      <label>Horas:</label>
        <input
          type="text"
          value={values.horas}
          name="horas"
          placeholder="Ingrese las horas trabajadas"
          className="form-control"
          onChange={handleInputChange}
        />
      </div>
      <button className="btn btn-primary btn-block">
        {props.currentId === "" ? "Guardar" : "Actualizar"}
      </button>
    </form>
  );
};

export default EmpleadosForm;
