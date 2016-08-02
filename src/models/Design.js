class Design {
  constructor( indicators, animationType, repetitionNumber, time ){
    this.indicators = indicators;
    this.animationType = animationType;
    this.repetitionNumber = repetitionNumber;
    this.time = time;
  }
}

function toggleDesignIndicator(design, type, index){
  design.indicators[type][index] = +!design.indicators[type][index];
}

const DESIGN_INDICATOR_TYPES = { VERTICAL : 'vertical', HORIZONTAL : 'horizontal'};

export { Design, DESIGN_INDICATOR_TYPES, toggleDesignIndicator };
