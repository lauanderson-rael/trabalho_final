import Sala from "./Sala.js";
import Usuario from "./Usuario.js";
import Reserva from "./Reserva.js";

await Sala.sync();
await Usuario.sync();
await Reserva.sync();
