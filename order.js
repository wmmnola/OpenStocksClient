var Order = function(company) {
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

}
