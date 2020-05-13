# Help pushing big files on github

My archive ms.tif is very important to my project and it needs to
be in the repository. The GitHub had a file limit that does not allow
push files bigger than 100 mb(not sure).

To push this files GitHub had the Git LFS (Large File Storage), and
this file will contain a little tutorial about how to push this files
using Git LFS.

## Git LFS

To use it, you are going to need the git instaled.

In the repository you need to start a lfs type of repository using
the following command line:

	git lfs install

After you will need to track these files:

	git lfs track '*.file-type'

When it is done, you will need to add and commit as a normal file. Our
final step is push our files and we can use it by the command:

	git lfs push --all origin master
	git push -u origin master

It saves my project and I hope it could help someone too.
