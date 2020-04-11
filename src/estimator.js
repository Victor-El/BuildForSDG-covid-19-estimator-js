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

const covid19ImpactEstimator = (data) => {
  impact = {};
  severeImpact = {};

  impact.currentlyInfected = computeImpactCurrentlyInfected(data.reportedCases);
  impact.infectionsByRequestedTime = computeInfectionsByRequestedTime(impact.currentlyInfected, data.timaToElapse, data.periodType);

  severeImpact.currentlyInfected = computeSevereImpactCurrentlyInfected(data.reportedCases);
  severeImpact.infectionsByRequestedTime = computeInfectionsByRequestedTime(severeImpact.currentlyInfected, data.timaToElapse, data.periodType);

  return {
    data,
    impact,
    severeImpact
  };
};


export default covid19ImpactEstimator;
