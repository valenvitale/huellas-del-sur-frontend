import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";

export default function Home() {
  return (
    <section>
      <h1>Huellas del Sur 🐾</h1>
      <p>Conectamos huellas con hogares.</p>

      <Card>
        <h2>Encontrá a tu compañero ideal</h2>
        <p>
          Conocé a los animales que esperan un hogar.
        </p>

        <Input
          label="Buscar animal"
          placeholder="Ej.: perro, gato..."
        />

        <div className="home-actions">
          <Button>Buscar</Button>
          <Button variant="secondary">
            Conocer refugios
          </Button>
        </div>
      </Card>
    </section>
  );
}
