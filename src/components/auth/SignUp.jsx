import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import BookIcon from './Book.avif'
//import { useAuth } from "@/context/AuthContext"
import { useExpressAuth } from "@/context/ExpressAuthContext"
import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { registerUser } from "@/services/userService"

export function SignUp() {
  // Utilisation du contexte d'authentification de firebase
  //const { signUp } = useAuth(); // Hook personnalisé au lieu de useContext

  // Utilisation du contexte d'authentification avec Express et JWT
  const { register } = useExpressAuth();
  const navigate = useNavigate();
  const [validation, setValidation] = useState("");

  const inputs = useRef([]);
  const addInputs = el => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };
  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();

    const nom = inputs.current[0]?.value?.trim();
    const email = inputs.current[1]?.value?.trim();
    const password = inputs.current[2]?.value?.trim();

    // Validation des champs
    if (!nom || !email || !password) {
      setValidation("Veuillez remplir tous les champs");
      return;
    }

    // Validation de la longueur du mot de passe
    if (password.length < 6) {
      setValidation("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    console.log("Nom:", nom);
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const cred = await registerUser(nom, email, password);
      setValidation("");
      console.log("Inscription réussie:", cred);
      navigate("/");
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      
      // Traduire les codes d'erreur Firebase en messages français
      let errorMessage = "Une erreur s'est produite lors de l'inscription";
      
      if (error?.code) {
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage = "Cet email est déjà utilisé par un autre compte";
            break;
          case "auth/invalid-email":
            errorMessage = "Format d'email invalide";
            break;
          case "auth/weak-password":
            errorMessage = "Le mot de passe est trop faible";
            break;
          case "auth/operation-not-allowed":
            errorMessage = "L'inscription par email/mot de passe n'est pas activée";
            break;
          case "auth/network-request-failed":
            errorMessage = "Erreur de connexion réseau. Vérifiez votre connexion";
            break;
          default:
            errorMessage = error?.message || "Erreur lors de la création du compte";
        }
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      setValidation(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
    <div className="w-full max-w-md">
         {/* Logo */}
      <div className="text-center mb-8">
         <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
              <img
                src={BookIcon}
                alt="Icône lecture"
                className="w-8 h-8 object-contain"
              />
          </div>
        <h1 className="text-3xl font-bold text-foreground">e-books</h1>
        <p className="text-muted-foreground mt-2">
         Créez un compte pour commencer
        </p>
      </div>

      <Card>
      <CardHeader>
        <CardDescription className="flex justify-center">
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          ref={formRef}
          onSubmit={handleForm}
        >
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="nom">Nom</Label>
              <Input
                ref={addInputs}
                id="nom"
                type="text"
                placeholder="Votre nom"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                ref={addInputs}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                ref={addInputs}
                id="password"
                type="password"
                required
              />
              <p className="text-danger mt-1">{validation}</p>
            </div>
          </div>
          <Button type="submit" className="w-full mt-4">
            Sign Up
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button variant="outline" className="w-full">
          Continue with Google
        </Button>
        <CardAction>
          <div className="flex flex-end">
            <Button variant="link" onClick={() => navigate("/")}>
              Vous avez déjà un compte ? Connectez-vous
            </Button>
          </div>
        </CardAction>
      </CardFooter>
    </Card>

      </div>
      </div>
  )
}
