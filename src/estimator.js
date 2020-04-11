/* eslint-disable max-len */
/* eslint-disable no-restricted-properties */
const computeImpactCurrentlyInfected = (reportedCases) => reportedCases * 10;
const computeSevereImpactCurrentlyInfected = (reportedCases) => reportedCases * 50;
const computeInfectionsByRequestedTime = (currentlyInfected, requestedTime, periodType) => {
  let infectionsByRequestedTime = 0;
  switch (periodType.toLowerCase()) {
    case 'days':
      infectionsByRequestedTime = currentlyInfected * (Math.pow(2, Math.floor(requestedTime / 3)));
      break;
    case 'weeks':
      infectionsByRequestedTime = currentlyInfected * (Math.pow(2, Math.floor((requestedTime * 7) / 3)));
      break;
    case 'months':
      infectionsByRequestedTime = currentlyInfected * (Math.pow(2, Math.floor((requestedTime * 30) / 3)));
      break;
    default:
      throw new Error('Invalid argument, periodType must be either days, weeks or months');
  }

  return infectionsByRequestedTime;
};

const computeSevereCasesByRequestedTime = (infectionsByRequestedTime) => Math.floor(infectionsByRequestedTime * Math.floor((15 / 100)));

const computeHospitalBedsByRequestedTime = (totalHospitalBeds, severeCasesByRequestedTime) => Math.floor(totalHospitalBeds * Math.floor((35 / 100))) - severeCasesByRequestedTime;

const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};

  impact.currentlyInfected = computeImpactCurrentlyInfected(data.reportedCases);
  impact.infectionsByRequestedTime = computeInfectionsByRequestedTime(impact.currentlyInfected, data.timeToElapse, data.periodType);
  impact.severeCasesByRequestedTime = computeSevereCasesByRequestedTime(impact.infectionsByRequestedTime);
  impact.hospitalBedsByRequestedTime = computeHospitalBedsByRequestedTime(data.totalHospitalBeds, impact.severeCasesByRequestedTime);

  severeImpact.currentlyInfected = computeSevereImpactCurrentlyInfected(data.reportedCases);
  severeImpact.infectionsByRequestedTime = computeInfectionsByRequestedTime(severeImpact.currentlyInfected, data.timeToElapse, data.periodType);
  severeImpact.severeCasesByRequestedTime = computeSevereCasesByRequestedTime(severeImpact.infectionsByRequestedTime);
  severeImpact.hospitalBedsByRequestedTime = computeHospitalBedsByRequestedTime(data.totalHospitalBeds, severeImpact.severeCasesByRequestedTime);

  return {
    data,
    impact,
    severeImpact
  };
};


export default covid19ImpactEstimator;
