# Contributing to SvCoreLib
**Before you submit your changes as a pull / merge request, please follow this step-by-step guide:**  

1. Make sure you have pulled the latest changes from `origin/master` into your local branch
2. Add yourself to the `contributors` array in the file `package.json` :)
    > If it doesn't exist, refer to [this website](https://flaviocopes.com/package-json/#contributors) on how to add it (please use the second format to make using it easier).
3. Run the command `npm run lint` in your terminal to make sure your code is free of errors
4. Run the command `npm test` in your terminal to run the unit tests for SvCoreLib to make sure all functions, classes, methods and object still work as expected.
    > If this fails, you will see the index of the tests that succeeded. From this you can deduce which tests didn't work out. You can then further debug it by taking a look at the file `unittests.js`, searching for the index of the failed test(s) to see what exactly broke.
5. Then, submit a new pull / merge request (https://github.com/Sv443/SvCoreLib/compare)
    > Select `Sv443/SvCoreLib` and `master` as the `base` and your forked repository and your edited branch as the `compare`.
