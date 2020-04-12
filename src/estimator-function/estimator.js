/* eslint-disable max-len */
/* eslint-disable no-restricted-properties */
/* eslint-disable radix */
/* eslint-disable prefer-const */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */

const getFactor = (time) => {
  const power = Math.trunc(time / 3);
  const result = Math.pow(2, power);
  return result;
};

const getNormalizedDays = (periodType, timeToElapse) => {
  switch (periodType) {
    case 'weeks':
      return timeToElapse * 7;
    case 'months':
      return timeToElapse * 30;
    default:
      return timeToElapse;
  }
};

const covid19ImpactEstimator = (data) => {
  const { reportedCases } = data;
  const { timeToElapse } = data;
  const { periodType } = data;
  const { totalHospitalBeds } = data;
  const { region } = data;
  const { avgDailyIncomeInUSD } = region;
  const { avgDailyIncomePopulation } = region;
  const impactCurrentlyInfected = reportedCases * 10;
  const severeImpactCurrentlyInfected = reportedCases * 50;
  const impactInfectionsByRequestedTime = impactCurrentlyInfected * getFactor(getNormalizedDays(periodType, timeToElapse));
  const severeImpactInfectionsByRequestedTime = severeImpactCurrentlyInfected * getFactor(getNormalizedDays(periodType, timeToElapse));
  const impactSevereCasesByRequestedTime = Math.trunc(impactInfectionsByRequestedTime * 0.15);
  const severeSevereCasesByRequestedTime = Math.trunc(severeImpactInfectionsByRequestedTime * 0.15);
  const impactHospitalBedsByRequestedTime = Math.trunc((totalHospitalBeds * 0.35) - impactSevereCasesByRequestedTime);
  const severeHospitalBedsByRequestedTime = Math.trunc((totalHospitalBeds * 0.35) - severeSevereCasesByRequestedTime);
  const impactCasesForICUByRequestedTime = Math.trunc(impactInfectionsByRequestedTime * 0.05);
  const severeCasesForICUByRequestedTime = Math.trunc(severeImpactInfectionsByRequestedTime * 0.05);
  const impactCasesForVentilatorsByRequestedTime = Math.trunc(impactInfectionsByRequestedTime * 0.02);
  const severeCasesForVentilatorsByRequestedTime = Math.trunc(severeImpactInfectionsByRequestedTime * 0.02);
  const impactDollarsInFlight = Math.trunc(((impactInfectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD) / getNormalizedDays(periodType, timeToElapse)));
  const severeDollarsInFlight = Math.trunc(((severeImpactInfectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD) / getNormalizedDays(periodType, timeToElapse)));

  return {
    data,
    impact: {
      currentlyInfected: impactCurrentlyInfected,
      infectionsByRequestedTime: impactInfectionsByRequestedTime,
      severeCasesByRequestedTime: impactSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime: impactHospitalBedsByRequestedTime,
      casesForICUByRequestedTime: impactCasesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: impactCasesForVentilatorsByRequestedTime,
      dollarsInFlight: impactDollarsInFlight
    },
    severeImpact: {
      currentlyInfected: severeImpactCurrentlyInfected,
      infectionsByRequestedTime: severeImpactInfectionsByRequestedTime,
      severeCasesByRequestedTime: severeSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime: severeHospitalBedsByRequestedTime,
      casesForICUByRequestedTime: severeCasesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: severeCasesForVentilatorsByRequestedTime,
      dollarsInFlight: severeDollarsInFlight
    }
  };
};

export default covid19ImpactEstimator;
