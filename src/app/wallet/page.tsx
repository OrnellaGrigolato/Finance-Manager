"use client";
import Navbar from "../dashboard/Navbar";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
} from "chart.js";
import { useEffect, useState } from "react";
import { useApiData } from "../providers/Providers";
import { Movement } from "../types/type";
import convertDate, {
  DollarResponse,
  groupByDate,
  groupByDateIncomeAndExpenditure,
  calculateDifferenceInDays,
  calcularSaldosPorFecha,
  getUserCurrencies,
} from "./useMovementsLogic";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement
);
const Wallet = () => {
  const apiData = useApiData();
  const [dolarPrice, setDolarPrice] = useState<DollarResponse[]>();
  const [moves, setMoves] = useState<Movement[]>([]);

  useEffect(() => {
    fetch("https://dolarapi.com/v1/dolares")
      .then((res) => res.json())
      .then((data) => {
        setDolarPrice(data);
      })
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    fetch(`api/moves/user/${apiData}`)
      .then((res) => res.json())
      .then((data) => {
        setMoves(data.finder);
      })
      .catch((e) => console.error(e));
  }, [apiData]);

  const saldosPorFecha = calcularSaldosPorFecha(moves);

  const fechasOrdenadasParaGrafico1 = Object.keys(saldosPorFecha).sort(
    (a: string, b: string) => new Date(a).getTime() - new Date(b).getTime()
  );

  const saldosOrdenados = fechasOrdenadasParaGrafico1.map(
    (fecha: string) => saldosPorFecha[fecha]
  );

  const data = {
    labels: fechasOrdenadasParaGrafico1,
    datasets: [
      {
        data: saldosPorFecha,
        backgroundColor: "transparent",
        borderColor: "#8A22F0",
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
        tension: 0.5,
      },
    ],
  };
  const movimientosAgrupados = groupByDate(moves);
  const labels = Object.keys(movimientosAgrupados)
    .sort(
      (a: string, b: string) => new Date(a).getTime() - new Date(b).getTime()
    )
    .map((date) => {
      const descripcionDiferencia = calculateDifferenceInDays(date);
      return descripcionDiferencia;
    });

  const movimientosAgrupadosparaIngresoYEgreso =
    groupByDateIncomeAndExpenditure(moves);

  // Convertimos el objeto en un array y ordenamos las fechas
  const fechasOrdenadas = Object.keys(
    movimientosAgrupadosparaIngresoYEgreso
  ).sort(
    (a: string, b: string) => new Date(a).getTime() - new Date(b).getTime()
  );

  // Creamos los arrays de ingresos y gastos
  const ingresos = fechasOrdenadas.map(
    (fecha) => movimientosAgrupadosparaIngresoYEgreso[fecha].ingresos
  );
  const gastos = fechasOrdenadas.map(
    (fecha) => movimientosAgrupadosparaIngresoYEgreso[fecha].gastos
  );

  const data2 = {
    labels: labels,
    datasets: [
      {
        label: "Ingresos",
        data: ingresos,
        backgroundColor: "rgba(138, 34, 240,0.4)",
        borderColor: "rgba(138, 34, 240,1)",
        borderWidth: 1,
      },
      {
        label: "Gastos",
        data: gastos,
        backgroundColor: "rgba(255, 99, 132, 0.4)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className=" bg-bg">
      <Navbar />
      <div className="w-11/12 mx-auto max-sm:w-10/12">
        <div className="ml-[10vw] max-sm:ml-0">
          <div className="h-32 flex items-center gap-14 ">
            <div>
              <h1 className="font-bold text-xl leading-tight mx-auto w-full">
                Your Wallet
              </h1>
              <p>
                Manage your information, configure your experience and keep your
                account safe.
              </p>
            </div>
          </div>
          <div className="flex gap-8 max-sm:flex-col">
            <div className="border-card-bg border-2 p-10 shadow-blackShadow rounded-2xl">
              <h2 className="font-bold text-xl mb-6">Your balance over time</h2>
              <div className="flex  max-sm:flex-col max-sm:items-center">
                <div className="mr-12 max-sm:mr-0 max-sm:text-center max-sm:mb-8">
                  <div className="flex flex-col w-32 mb-5 ">
                    <b className="font-bold text-lg">{moves.length}</b>
                    <p className="text-xs font-light">
                      is the number of movements you have made
                    </p>
                  </div>
                  <div className="flex flex-col w-32">
                    <b className="font-bold text-lg">
                      {getUserCurrencies(moves)}
                    </b>
                    <p className="text-xs font-light">
                      is the number of currencies you have
                    </p>
                  </div>
                </div>
                <div>
                  <Line data={data} />
                </div>
              </div>
            </div>
            <div className="border-card-bg border-2 p-10 shadow-blackShadow rounded-2xl w-full ">
              <div className="flex justify-between max-sm:flex-col">
                <h2 className="font-bold text-xl mb-6">
                  Total cast in and out{" "}
                </h2>
                <div className="flex gap-5  mb-6">
                  <div className="flex items-center gap-2 justify-center">
                    <div className="w-4 h-2 bg-primary/[0.4] border-2 border-primary "></div>
                    Cash In
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    {" "}
                    <div className="w-4 h-2 bg-[#FF6384]/[0.4] border-2 border-[#FF6384]"></div>
                    Cash Out
                  </div>
                </div>
              </div>

              <div className="h-44">
                <Bar
                  data={data2}
                  options={{ maintainAspectRatio: false, aspectRatio: 1 }}
                />
              </div>
            </div>
          </div>
          <div className="border-card-bg border-2 p-10 shadow-blackShadow rounded-2xl w-fit mt-8 max-sm:w-full max-sm:mb-20">
            {dolarPrice ? (
              <div>
                <h2 className="font-bold text-xl mb-6">Dolar prices</h2>
                <p className="text-xs font-light -mt-6 mb-4">
                  Updated on: {convertDate(dolarPrice[0].fechaActualizacion)}
                </p>

                <div className="flex gap-5 max-sm:flex-col max-sm:items-center">
                  <div className="border-primary/40 border-2 p-4 flex flex-col items-center rounded-lg text-lg w-44">
                    Dolar Blue
                    <div className="flex gap-3 text-sm mt-3 mb-1">
                      <div className="font-bold">Venta</div>
                      <div>Compra</div>
                    </div>
                    <div className="flex text-black/40">
                      <b className="text-black/100">
                        ${" "}
                        {Math.round(
                          dolarPrice.filter((e) => e.nombre === "Blue")[0].venta
                        )}
                      </b>
                      <p className="mx-3">/</p>${" "}
                      {Math.round(
                        dolarPrice.filter((e) => e.nombre === "Blue")[0].compra
                      )}
                    </div>
                  </div>
                  <div className="border-primary/40 border-2 p-4 flex flex-col items-center  rounded-lg text-lg  w-44">
                    Dolar Oficial
                    <div className="flex gap-3 text-sm mt-3 mb-1">
                      <div className="font-bold">Venta</div>
                      <div>Compra</div>
                    </div>
                    <div className="flex text-black/40">
                      <b className="text-black/100">
                        ${" "}
                        {Math.round(
                          dolarPrice.filter((e) => e.nombre === "Oficial")[0]
                            .venta
                        )}
                      </b>
                      <p className="mx-3">/</p>${" "}
                      {Math.round(
                        dolarPrice.filter((e) => e.nombre === "Oficial")[0]
                          .compra
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
