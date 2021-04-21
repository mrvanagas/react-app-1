import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import AuthForm from '../../components/AuthForm';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const isEmail = (value) => emailRegex.test(value.toLowerCase());

const Form = () => {
  const formik = useFormik({
    // Pradinės laukų reikšmės
    initialValues: {
      email: ''
    },
    /*
     Funkcija kuri validuoja laukus <values> (ištraukia jų reikšmias iš <input elementų>)
     Ši funkcija turi grąžinti klaidų objektą, tokias pačiais savybių pavadinimais,
     kai initValues savybėje, jeigu klaidos susijusios su konkrečia įvestimi nėra,
     tos savybės grąžiname objekta neturi būti.
     Mums nematomi papildomi veiksmai: 
      * Šios funkcijos grąžintas objektas bus įdedamas į <formik.errors>
      * Kol yra grąžinamas NE TUŠČIAS objektas, tol yra blokuojamas onSubmit funkcijos vykdymas
    */
    validate: (values) => {
      const errors = {}
      if (!isEmail(values.email)) {
        errors.email = 'Incorrect email'
      }
      return errors;
    },
    /*
      Ši funkcija vykdoma, yra 'submit'inama forma IR kuomet <formik.validate> funkcija grąžina tuščia objektą 
    */
    onSubmit: (values) => {
      alert(JSON.stringify(values))
    }
  });

  console.log('formik.values', formik.values);
  console.log('formik.errors', formik.errors);

  return (
    <AuthForm
      title="Forgot password"
      submitText="Send password reset link"
      onSubmit={formik.handleSubmit} // <formik.handleSubmit> metodas turi būti įdėtas į formos onSubmit attributą/savybę
      links={[
        { to: '/login', text: 'Login' },
        { to: '/register', text: 'Register' },
      ]}
    >
      <TextField
        label="Email"
        variant="outlined"
        name="email" // Input'ai privalo turėti tą patį 'name' atributą, kaip <formik.initialValues> objekte esanti savybė
        value={formik.values.email} // Aplikacijos metu, visos formos reikšmės pasiekiamos <formik.values> objekte
        onChange={formik.handleChange} // PAGAL 'name' atributą automatiškai susinchronizuojamas įvesties pasikeitimo event'as
        error={!!formik.errors.email} // Tikriname, yra klaida ar ne; Pagal mui TextField dokumentaciją čia turi būti Boolean reikšmė
        // useFormik hook'sas ir jame aprašyta validate funkcija įdeda klaidos tekstą į errors objektą pagal savybės pavadinimą
        helperText={formik.errors.email ?? false} // Pagal mui TextField dokumentaciją čia gali būti perduodamas tekstas, jeigu yra klaida. 
        fullWidth
        required
        size="small"
      />
    </AuthForm>
  )
}

export default Form;

