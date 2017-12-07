# js-ds-algo
Data Structures and Algorithms Problems and solutions in Javascript

##Problem Statement: rangeColection.js:

## Task
Implement a `Range Collection` class.  
A pair of integers define a range, for example: `[1, 5)`.  
This range includes integers: `1, 2, 3, and 4`.  
A range collection is an aggregate of these ranges: `[1, 5), [10, 11), [100, 201)`



## Test

````
// Example run
const rc = new RangeCollection()

rc.add([1, 5])
rc.print()
// Should display: [1, 5)

rc.add([10, 20])
rc.print()
// Should display: [1, 5) [10, 20)

rc.add([20, 20])
rc.print()
// Should display: [1, 5) [10, 20)

rc.add([20, 21])
rc.print()
// Should display: [1, 5) [10, 21)

rc.add([2, 4])
rc.print()
// Should display: [1, 5) [10, 21)

rc.add([3, 8])
rc.print()
// Should display: [1, 8) [10, 21)

rc.remove([10, 10]) => S’’
rc.print()
// Should display: [1, 8) [10, 21)

rc.remove([10, 11])
rc.print()
// Should display: [1, 8) [11, 21)

rc.remove([15, 17])
rc.print()
// Should display: [1, 8) [11, 15) [17, 21)

rc.remove([3, 19])
rc.print()
// Should display: [1, 3) [19, 21)
````

