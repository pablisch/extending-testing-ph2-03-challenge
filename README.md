# extending-testing-ph2-03-challenge

Some test with original data

![combinations with originals](images/has_originals2.png)

Some test without original data

![combinations without originals](images/no_originals5.png)

We are starting test planning with some distinct main considerations:
1. How valid data that 'works' within the program is handled in terms of how it is 'allowed' or 'dropped' and what is passed into `finals`.
2. How different data is processed and it is does work as expected.
3. How the program behaves with more than one name file.
4. How the program deals with multiple entries with the same surname referring to different people.

Early manual exploration has shown no obvious problems and the supplied test data appears to work properly in the app making it ideal data to use for initial testing of the basic expected 'routes' that data is expected to take and what should be expected to end up in `finals`.

## Test cases

### Basic functionality using provided data set

A set of tests using the provided data set for each combination of originals present/absent, updates present/absent, allowlist/droplist containing/not containing. This constitutes the 12 tests in the diagrams above.

### Different name and address data

To test things