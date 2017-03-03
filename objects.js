var Buy_Order = function(company) {
  this.company = company;
  this.buyAmount = 0;
  this.total = 0;
  this.buy = function() {
    if (this.buyAmount <= this.company.selfOwnedSock.length - 1) {
      this.buyAmount += 1;
      this.total = parseFloat(this.buyAmount * this.company.sharevalue);
    }
  }
  this.priceOfOne = function() {
    return parseFloat(this.company.sharevalue);
  }
  this.print_order = function() {
    console.log(this.buyAmount + " of stock at " + this.company.sharevalue +
      " for a total of " + this.total);
  }

}
var Sell_Order = function(company) {
  this.company = company;
  this.sellAmount = 0;
  this.total = 0;
  this.sell = function() {
    this.sellAmount += 1;
    this.total = parseFloat(this.sellAmount * this.company.sharevalue);
  }
  this.priceOfOne = function() {

  }
}
var Ownership_Record = function(company) {
  this.company = company;
  this.amount = 0;
  this.full_value = function() {
    return this.amount * parseFloat(this.company.sharevalue);
  }
}
