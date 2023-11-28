# extending-testing-ph2-03-challenge

Some test with original data

![combinations with originals](images/has_originals2.png)

Some test without original data

![combinations without originals](images/no_originals5.png)

We are starting test planning with some distinct main considerations:
1. How valid data that 'works' within the program is handled in terms of how it is 'allowed' or 'dropped' and what is passed into `finals`.
2. How different data is processed and if it works as expected.
3. How the program behaves with more than one name file.
4. How the program deals with multiple entries with the same surname referring to different people.

Early manual exploration has shown no obvious problems and the supplied test data appears to work properly in the app making it ideal data to use for initial testing of the basic expected 'routes' that data is expected to take and what should be expected to end up in `finals`.

## Test cases

Test records can be found in [test.md](https://github.com/pablisch/extending-testing-ph2-03-challenge/blob/main/Tests.md).

### Basic functionality using provided data set

A set of tests using the provided data set for each combination of originals present/absent, updates present/absent, allowlist/droplist containing/not containing. This constitutes the 12 tests in the diagrams above.

### Different name and address data

To test things such as addresses of different lengths, different postcade formats, name formats, etc.

### More than one file being processed at a time with different outcomes.

Testing multiple names and situations all at once rather than the individual focussed tests to reproduce a more 'real world' scenario for testing.

### Mulitple entries with the same surname

This includes have multiple people with the same surname alongside each other in the same directory, e.g. originals, but also the possibility of having people with the same surname each in the different source directories.

## Process

We started with a good idea of where we felt it was important to test and assumed that discovery would also lead us in certain directions.

We used a good level of automation in arranging test condtions that saved a lot of time and used this to largely test manually, observing the results.

We did get very close to full automation using Jest in JavaScript and certainly got as far as running the Python file in a JavaScript test file. Jest tests were setup but anomalous results and lack of time meant we decided to carry on with semi-manual tests.

We have a faker.js file that produces fake data and could easily be adapted to be used with our semi-automated setup or a fully automated test suite. It is reasonable to say we were close to the point of it becoming useful but not in the time we had.

For the most part we used addData.js and addDataSplit.js to semi-automate our set up our test situations. The latter was very sueful in quickly getting the specific data we required for specific targetted tests.