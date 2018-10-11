const RATES = {
  'pension': (9.76/100),
  'disability': (1.5/100),
  'sickness': (2.45/100),
  'healthContribution': (9/100),
  'healthDeductible': (7.75/100)
};

const TAX = {
  'rate18': (18/100),
  'rate19': (19/100),
  'rate32': (32/100),
  'taxLimit': 85528
};

const UOPOPTIONS = {
  'earningCost': 111.25,
  'monthlyRelief': 46.33,
  'annualLimit': 133290 /* Annual limit for pension and disability calculations */
};

const TAXTYPE = {
  'progressive': Symbol('18%/32%'),
  'linear': Symbol('19%')
};

const ZUS = {
  'noZUS': Symbol('No contributions in the first 6 months'),
  'discountedZUS': Symbol('Lower contributions in the first 2 years'),
  'normalZUS': Symbol('Normal contribution')
};

const CONTRACT = {
  'B2B': Symbol('B2B'),
  'UOP': Symbol('Umowa o prace')
};
