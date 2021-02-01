import React, { useState }  from 'react'
import { useForm } from "../hooks/useForm";
import { TextField, Box } from "@material-ui/core";
import useStyles  from "../themes/theme.settings";
import Button from "@material-ui/core/Button";

 const SettingsForm = () => {
   const classes = useStyles();

   const [companies, setCompanies] = useState([{ id: 123, company: "Amazon" }]);
   const [email, setUserEmail] = useForm({ email: "myemail@gmail.com" });

   const handleChangeInput = (index, event) => {
     const values = [...companies];
     values[index][event.target.name] = event.target.value;
     setCompanies(values);
   };

   const addCompany = () =>
     setCompanies([...companies, { company: "", id: Date.now() }]);

   const removeCompany = (id) => {
     const values = [...companies].filter((company) => company.id !== id);
     setCompanies(values);
   };

   const handleSubmit = (e) => {
     e.preventDefault();
     console.log(companies, email);
   };
   return (
     <form onSubmit={(e) => handleSubmit(e)}>
       <Box className={classes.container}>
         <Box className={classes.label}>
           <label>Your Company</label>
         </Box>
         <Box display="flex" flexDirection="column">
           {companies.map(({ company, id }, index) => (
             <TextField
               key={id}
               name="company"
               type="text"
               variant="outlined"
               margin="normal"
               size="medium"
               className={classes.input}
               id="company"
               placeholder="Company name"
               required
               value={company}
               onChange={(event) => handleChangeInput(index, event)}
               autoFocus
               InputProps={{
                 endAdornment:
                   index + 1 === companies.length ? (
                    <Button   className={classes.buttonInput} add onClick={addCompany} >Add</Button>                   
                   ) : (
                    <Button  className={classes.buttonInput}    onClick={()=>removeCompany(id)} >Remove</Button>
                   ),
               }}
             />
           ))}
         </Box>
       </Box>
       <Box display="flex">
         <Box className={classes.label}>
           <label>Weekly Report</label>
         </Box>
         <Box>
           <TextField
             name="email"
             type="email"
             variant="outlined"
             margin="normal"
             size="medium"
             label="Your Email"
             className={classes.input}
             required
             id="email"
             value={email.email}
             autoComplete="email"
             autoFocus
             onChange={setUserEmail}
           />
         </Box>
       </Box>
       <Button className={classes.button} type="submit">
         Save
       </Button>
     </form>
   );
 }
export default SettingsForm