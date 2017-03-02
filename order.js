var Order = function(company) {
  this.company = company;
  this.buyAmount = 0;
  this.buy = function() {
    this.buyAmount += 1;
  }
}
