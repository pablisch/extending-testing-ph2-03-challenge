# Tests and Bug report

See [here](#bug-reports) for Bug Report.

Some test with original data

![combinations with originals](images/has_originals2.png)

Some test without original data

![combinations without originals](images/no_originals5.png)

# IMPORTANT
* For brevity, all the tests below include a number, or multiple numbers that reference the diagrams above to explain what test is being carried out.
* `Makers data` refers to the data that was supplied in the example test and is shown in full at the [bottom of this page](#sample-test-data).
* `Address length data` refers to generic data used for achieving address of different numbers of lines. Examples of this data will also be fond at the [bottom of the page](#sample-test-data).

| No. | Test  | Expected  | Actual | As expected |
| - | ----------------------- | ----------------- | ----------------- | ------|
|  | Using Makers data | | |
| 1 | 1 | Updated => Finals | Updated => Finals | Y |
| 2 | 2 | Originals => Finals | Originals => Finals | Y |
| 3 | 3 | Updated => Finals | Updated => Finals | Y |
| 4 | 4 | No Finals |  No finals | Y |
| 5 | 5 | Updated => Finals | Updated => Finals | Y |
| 6 | 6 | No Finals |  No finals | Y |
| 7 | 7 | Updated => Finals | Updated => Finals | Y |
| 8 | 8 | Originals => Finals | Originals => Finals | Y |
| 9 | 9 | No Finals |  No finals | Y |
| 10 | 10 | Updated => Finals | Updated => Finals | Y |
| 11 | 11 | No Finals |  No finals | Y |
| 12 | 12 | Updated => Finals | Updated => Finals | Y |
|  | Using Address length data | | |
| 13 | (1) both addresses have name, city and postcode | Updated => Finals | ERROR: document " Coach " doesn't contain an appropriately formatted address | N |
| 14 | (2) original address has name, city and postcode | Originals => Finals | ERROR: document " Coach " doesn't contain an appropriately formatted address | N |
| 15 | (3) both addresses have name, city and postcode | Updated => Finals | ERROR: document " Coach " doesn't contain an appropriately formatted address | N |
| 16 | (4) original address has name, city and postcode | No Finals | ERROR: document " Coach " doesn't contain an appropriately formatted address | N |
| 17 | (1) Original has five line address and updated address has name, city and postcode | Updated => Finals | ERROR: document " Coach " doesn't contain an appropriately formatted address | N |
| 18 | (1) Original has five line address and updated address has name, road, city and postcode | Updated => Finals| Updated => Finals | Y |
| 19 | (1) Original has three lines name, road, postcode and updated address has name, road, city and postcode | Updated => Finals| ERROR: document " Coach " doesn't contain an appropriately formatted address | N |
| 20 | (1) Original has six lines and updated address has name, road, city and postcode | Updated => Finals| ERROR: document " Coach " doesn't contain an appropriately formatted address | N |
| 21 | (1) Original has name, road, city and postcode and updated address has six lines | Updated => Finals| ERROR: document " Coach " doesn't contain an appropriately formatted address | N |
|  | Testing multiple people with the same surname |||
| 22 | (1) Two people with the same surname, both with entries in original and updates | Updated => Finals for both people | Cannot create files for both people as one gets overwritten | N |
| 23 | (1) One person in originals and one person in updates with the same surname | Originals => Finals and Updated => Finals | Only the Updates => Finals | N |
|  | Testing multiple names at once |||
| 24 | (1)(3)(4)(10) Sue Coach and Sam Green will be in Originals and Updates and Ann Smith is in Originals and George Benn is in Updates and the allowlist contains Coach and Benn | Sue Coach and Sam Green and George Benn Updated => Finals | Sue Coach and Sam Green and George Benn Updated => Finals | Y |
| 25 | (3)(1)(2)(10) Sue Coach and Sam Green will be in Originals and Updates and Ann Smith is in Originals and George Benn is in Updates and the allowlist contains Smith and Green | Sue Coach and Sam Green and George Benn Updated => Finals and Ann Smith Originals => Finals | Sue Coach and Sam Green and George Benn Updated => Finals | N |
| 26 | (2)(10) Ann Smith is in Originals and George Benn is in Updates and the allowlist contains Smith, Green, Coach and Benn | George Benn Updated => Finals and Ann Smith Originals => Finals | George Benn Updated => Finals and Ann Smith Originals => Finals | Y |
| 27 | (2) Ann Smith is in Originals and the allowlist contains Smith, Green, Coach and Benn | Originals => Finals | Originals => Finals | Y |
| 28 | (2)(10) Ann Smith is in Originals and George Benn is in Originals & Updates and the allowlist contains Smith, Green, Coach and Benn | George Benn Updated => Finals and Ann Smith Originals => Finals | George Benn Updated => Finals | N |

## Bug Reports

Our bug reports have been raised as [GitHub issues](https://github.com/pablisch/extending-testing-ph2-03-challenge/issues).
Obviously these would normally be raised as issues in the repo with the issue but for the sake of keeping the information in place and under our control, these are entered as issues in this repo.

## Sample Test Data

`Makers` sample data.

**Originals:**
Dr Alex Coach
50 Commercial Street
London
E1 6LT

**Updates:**
Dr Alex Coach
Makers Academy
Zetland House
London
EC2A 4HJ

`Address length` sample data.

Sample Name
My House
My Road
My Town
My City
P1 1PP
UK

Variations of this format were used to recreate addresses with different number of lines. 
There remain many more tests to get definitive information and some gaps, e.g. an address excluding a postcode, but a pattern has er=merged suggesting that only addresses of 4 or 5 lines (including the name) are accepted.