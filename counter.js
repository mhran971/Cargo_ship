class FloatingVariables {
  constructor(variables) {
    this.variables = variables;
  }

  setVariablesSetFlag() {
    this.allVariablesSet = this.areAllVariablesSet();
  }

  areAllVariablesSet() {
    return this.variables.m !== 0 && this.variables.g !== 0 && this.variables.R !== 0 && this.variables.V !== 0;
  }
}

class FrictionOfWaterVariables {
  constructor(variables) {
    this.variables = variables;
  }

  setVariablesSetFlag() {
    this.allVariablesSet = this.areAllVariablesSet();
  }

  areAllVariablesSet() {
    return this.variables.A1 !== 0 && this.variables.R1 !== 0 && this.variables.v1 !== 0;
  }
}

class FrictionOfAirVariables {
  constructor(variables) {
    this.variables = variables;
  }

  setVariablesSetFlag() {
    this.allVariablesSet = this.areAllVariablesSet();
  }

  areAllVariablesSet() {
    return this.variables.A2 !== 0 && this.variables.R2 !== 0 && this.variables.v2 !== 0;
  }
}

class ThrustForceVariables {
  constructor(variables) {
    this.variables = variables;
  }

  setVariablesSetFlag() {
    this.allVariablesSet = this.areAllVariablesSet();
  }

  areAllVariablesSet() {
    return this.variables.R3 !== 0 && this.variables.RPM !== 0 && this.variables.PR3 !== 0 && this.variables.LP3 !== 0;
  }
}

class ThrustForceTotallyVariables {
  constructor(F1, F2, F3) {
    this.F1 = F1;
    this.F2 = F2;
    this.F3 = F3;
  }

  setVariablesSetFlag() {
    this.allVariablesSet = this.areAllVariablesSet();
  }

  areAllVariablesSet() {
    return this.F1 !== 0 && this.F2 !== 0 && this.F3 !== 0;
  }
}