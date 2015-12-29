beforeEach(function(){jasmine.addMatchers({toContainText:function(){return{compare:function(t,n){var e=t.textContent;return{pass:e.indexOf(n)>-1,get message(){return"Expected "+e+" to contain "+n}}}}}})});
//# sourceMappingURL=matchers.js.map
