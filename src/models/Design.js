class Design {
  constructor( indicators, animationType, repetitionNumber, time ){
    this.indicators = indicators;
    this.animationType = animationType;
    this.repetitionNumber = repetitionNumber;
    this.time = time;
  }
  toggleIndicator(type, index){
    this.indicators[type][index] = +!this.indicators[type][index];
  }
}

const DESIGN_INDICATOR_TYPES = { VERTICAL : 'vertical', HORIZONTAL : 'horizontal'};

export { Design, DESIGN_INDICATOR_TYPES };
