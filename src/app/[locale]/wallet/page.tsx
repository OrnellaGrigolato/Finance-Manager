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
  convertirMovimientos,
} from "./useMovementsLogic";
import baseUrl from "@/components/BaseUrl";
import { useTranslations } from "next-intl";

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
  const [convertedMoves, setConvertedMoves] = useState<Movement[]>([]);

  const t = useTranslations('Wallet');

  useEffect(() => {
    const convertion = async () => {
      const result = await convertirMovimientos(moves);
      setConvertedMoves(result);
    };

    // call the function
    convertion();
  }, [moves]);

  useEffect(() => {
    fetch("https://dolarapi.com/v1/dolares")
      .then((res) => res.json())
      .then((data) => {
        setDolarPrice(data);
      })
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    fetch(`${baseUrl}/api/moves/user/${apiData}`)
      .then((res) => res.json())
      .then((data) => {
        setMoves(data.finder);
      })
      .catch((e) => console.error(e));
  }, [apiData]);

  const saldosPorFecha = calcularSaldosPorFecha(convertedMoves);

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
  const movimientosAgrupados = groupByDate(convertedMoves);
  const labels = Object.keys(movimientosAgrupados)
    .sort(
      (a: string, b: string) => new Date(a).getTime() - new Date(b).getTime()
    )
    .map((date) => {
      const descripcionDiferencia = calculateDifferenceInDays(date);
      return descripcionDiferencia;
    });

  const movimientosAgrupadosparaIngresoYEgreso =
    groupByDateIncomeAndExpenditure(convertedMoves);

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
    <div className="bg-bg">
      <Navbar />
      <div className="w-11/12 mx-auto max-sm:w-10/12">
        <div className="ml-[10vw] max-sm:ml-0">
          <div className="h-32 flex items-center gap-14">
            <div>
              <h1 className="font-bold text-xl leading-tight mx-auto w-full">
                {t('yourWallet')}
              </h1>
              <p>
                {t('manageInfoAndExperience')}
              </p>
            </div>
          </div>
          <div className="flex gap-8 max-sm:flex-col">
            <div className="border-card-bg border-2 p-10 shadow-blackShadow rounded-2xl">
              <h2 className="font-bold text-xl mb-6">{t('yourBalanceOverTime')}</h2>
              <div className="flex max-sm:flex-col max-sm:items-center">
                <div className="mr-12 max-sm:mr-0 max-sm:text-center max-sm:mb-8">
                  <div className="flex flex-col w-32 mb-5 ">
                    <b className="font-bold text-lg">
                      {moves.filter((e) => e.title !== "Convert").length}
                    </b>
                    <p className="text-xs font-light">
                    {t('movementsCount')}
                    </p>
                  </div>
                  <div className="flex flex-col w-32">
                    <b className="font-bold text-lg">
                      {getUserCurrencies(moves).length} 
                    </b>
                    <p className="text-xs font-light">
                    {t('currenciesCount')}
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
                  {t('totalCashInOut')}
                </h2>
                <div className="flex gap-5  mb-6">
                  <div className="flex items-center gap-2 justify-center">
                    <div className="w-4 h-2 bg-primary/[0.4] border-2 border-primary "></div>
                    {t('cashIn')}
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <div className="w-4 h-2 bg-[#FF6384]/[0.4] border-2 border-[#FF6384]"></div>
                    {t('cashOut')}
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
                <h2 className="font-bold text-xl mb-6">{t('dolarPrices')}</h2>
                <p className="text-xs font-light -mt-6 mb-4">
                  {t('updatedOn')}: {convertDate(dolarPrice[0].fechaActualizacion)}
                </p>

                <div className="flex gap-5 max-sm:flex-col max-sm:items-center">
                  <div className="border-primary/40 border-2 p-4 flex flex-col items-center rounded-lg text-lg w-44">
                    {t('blueDolar')}
                    <div className="flex gap-3 text-sm mt-3 mb-1">
                      <div className="font-bold">{t('selling')}</div>
                      <div>{t('buying')}</div>
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
                    {t('officialDolar')}
                    <div className="flex gap-3 text-sm mt-3 mb-1">
                      <div className="font-bold">{t('selling')}</div>
                      <div>{t('buying')}</div>
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
