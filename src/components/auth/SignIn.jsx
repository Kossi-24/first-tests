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
import { useAuth } from "@/context/AuthContext"
import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"

export function SignIn() {

  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [validation, setValidation] = useState("");

  const inputs = useRef([]);
  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };
  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();

    const email = inputs.current[0]?.value?.trim();
    const password = inputs.current[1]?.value?.trim();

    // Validation des champs
    if (!email || !password) {
      setValidation("Veuillez remplir tous les champs");
      return;
    }

    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const cred = await signIn(email, password);
      setValidation("");
      console.log("Connexion réussie:", cred);
      navigate("/private/dashboard");
    } catch (error) {
      console.error("Erreur de connexion:", error);
      
      // Traduire les codes d'erreur Firebase en messages français
      let errorMessage = "Une erreur s'est produite lors de la connexion";
      
      if (error?.code) {
        switch (error.code) {
          case "auth/invalid-credential":
            errorMessage = "Email ou mot de passe incorrect";
            break;
          case "auth/user-not-found":
            errorMessage = "Aucun compte trouvé avec cet email";
            break;
          case "auth/wrong-password":
            errorMessage = "Mot de passe incorrect";
            break;
          case "auth/invalid-email":
            errorMessage = "Format d'email invalide";
            break;
          case "auth/user-disabled":
            errorMessage = "Ce compte a été désactivé";
            break;
          case "auth/too-many-requests":
            errorMessage = "Trop de tentatives. Veuillez réessayer plus tard";
            break;
          case "auth/network-request-failed":
            errorMessage = "Erreur de connexion réseau. Vérifiez votre connexion";
            break;
          default:
            errorMessage = error?.message || "Email ou mot de passe incorrect";
        }
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      setValidation(errorMessage);
    }
  }

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
           Connectez-vous pour continuer
          </p>
        </div>

    <Card >
      <CardHeader>
        <CardTitle></CardTitle>
        <CardDescription className="flex justify-center">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
        ref={formRef}
        onSubmit={handleForm}
        >
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="signInEmail">Email</Label>
              <Input
                ref={addInputs}
                type="email"
                name="email"
                placeholder="m@example.com"
                required
                id="signInEmail"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                  ref={addInputs}
                  name="pwd"
                  required
                  type="password"
                  id="signInPwd"
              />
              <p className="text-danger mt-1">{validation}</p>
            </div>
          </div>
           <Button type="submit" className="w-full">
          Sign In
        </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
       
        <Button variant="outline" className="w-full">
          Continue with Google
        </Button>
        <CardAction>
            <div className="flex flex-end">
            <Button variant="link" onClick={() => navigate("/signup")}>
              Vous n'avez pas de compte ? Créez-en un
            </Button>
            </div>
        </CardAction>
      </CardFooter>
    </Card>
      </div>
    </div>
  )
}
