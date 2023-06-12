# Contributing to Sv443 Network CoreLib
**Before you submit your changes as a pull / merge request, please follow this step-by-step guide:**  

1. Make sure you have pulled the latest changes from `origin/master` into your local branch
2. Add yourself to the `contributors` array in the file `package.json`, following the existing format :)
3. Run the command `npm run lint` in your terminal to make sure your code is free of errors and `npm run fix` to fix all auto-fixable problems and code style differences
4. To test the code, use `npm run build` and `npm link` to globally install the package, then create a test project and in its root run `npm link @sv443-network/core` so you can import the library and test it
5. Then, submit a new pull / merge request (https://github.com/Sv443-Network/SvCoreLib/compare)
  > Select `Sv443-Network/SvCoreLib` and `master` as the `base` and your forked repository and your edited branch as the `compare`.
<!-- 4. Run the command `npm test` in your terminal to run the unit tests for SvCoreLib to make sure all functions, classes, methods and object still work as expected.
  > If this fails, you will see the index of the tests that succeeded. From this you can deduce which tests didn't work out. You can then further debug it by taking a look at the file `unittests.js`, searching for the index of the failed test(s) to see what exactly broke. -->
