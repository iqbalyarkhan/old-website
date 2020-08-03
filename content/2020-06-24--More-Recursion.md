---
title: More Recursion
date: 2020-06-24
thumbnail: /post-images/recursion.png
draft: false
extract: More examples using recursion
categories: 
    - Dynamic Programming
tags:
    - Recursion
---
    
 1. [Integer Permutations](#integer-permutations)
 2. [Yet Another Subset Sum ](#yet-another-subset-sum)
 3. [Subset Sum Print](#subset-sum-print)
 4. [0-1 Knapsack](#0-1-knapsack)
 5. [Equal Sum Partition](#equal-sum-partition)
 6. [Longest Common Subsequence Length](#longest-common-subsequence-length)
 7. [Print Longest Common Subsequence](#print-longest-common-subsequence)
 8. [Longest Common Substring Length](#longest-common-substring-length)
 9. [Min Insertions Or Deletions](#min-insertions-or-deletions)
 10. [Longest Palindromic Subsequence](#longest-palindromic-subsequence)
 11. [Matrix Chain Multiplication]

### Additional Problems
Let's tackle a few more problems and some variations of the problems already seen in the [recursion](/recursion) post.

### Integer Permutations
**Given a vector of integers, generate all possible permutations**

This is similar to string permutations. The only difference here is that we're swapping integers in a vector instead of characters in a string:

Again, the template is:
- Check for base case
- Make a choice
- Recurse with the choice made

```cpp
void generatePerms(vector<int> s, int n){
    if (n == s.size() - 1){
        for (int i = 0; i < s.size(); i++){
            cout << s[i];
        }
        cout << endl;
        return;
    }
    for (int i = n; i < int(s.size()); i++){
        swap(s[i], s[n]);
        generatePerms(s, n+1);
    }
    return;
}
```

### Yet Another Subset Sum

In this approach, we'll solve subset sum using an approach similar to permutations problem above: Here, the for loop is used to choose or ignore the elements:

```cpp
void genSubsets(int i, vector<int> sol, vector<int> elems){
    if (i == elems.size()){
        cout << "{";
        for (int j = 0; j < sol.size(); j++){
            if (sol[j] != 0){
                cout << elems[j];
            }
        }
        cout << "}" << endl;
    } else {
        for (int k = 0; k < 2; k++){
            sol.push_back(k);
            genSubsets(i+1, sol, elems);
            sol.pop_back();
        }
    }
}
```

### Subset Sum Print
**Given a set and a target sum, print subsets that add up to a given target**

This one has an extra requirement on top of the subset sum problem: ie to print the found results. I really like this problem as it is a good way to actually translate the decision tree that we built for subset sum to code. 

As a recap, here's the tree we used for subset sum:

```cpp

                {}
           /         \      +a ?
          a          {}   
       /    \     /     \   +b ?
     ab     a    b      {}
   /   \   /  \ /  \   /  \ +c ?
  abc  ab ac  a bc b  c   {}
```

- **Base Case**
This occurs when we're out of decisions to make ie, when we're past the end of the input list. At this point, we can print the list we've accumulated so far IF the results add up to the target.

- **Recursive Case**
Here, we choose the current element and make a recursive call with that decision. Once this returns, we undo any changes we did for while choosing the element such as removing the chosen element from a vector that we maintain. We then ignore the current element and make a recursive call again. 

Let's look at the functions signature:

```cpp
void subsetSumPrint(vector<int>& elems, vector<int>& arr, int c, int sumSoFar, int n){}
```

- `elems` contains the input array
- `arr` to keep track of the elements seen so far
- `c` the target sum we're searching for
- `sumSoFar` the sum we've seen so far of the elements chosen/ignored
- `n` to iterate over the elements in the `elems` array

Next, here's the base case:

```cpp
void subsetSumPrint(vector<int>& elems, vector<int>& arr, int c, int sumSoFar, int n){
    if (n == elems.size()){
        if (sumSoFar == c){
            cout << "{";
            for (int i = 0; i < arr.size(); i++){
                cout << arr[i];
            }
            cout << "}" << endl;
        }
        return;
    }
}
```

The base case occurs when there are no more elements to pick. Here, we check to see if the sum we've been accruing up till now is equal to the target. If so, we print out the elements in the vector. Otherwise, we return without printing

Next, when we're going through the elements, we can choose the element. Choosing means we add the current element, `elems[n]` to `sumSoFar`:

```cpp
void subsetSumPrint(vector<int>& elems, vector<int>& arr, int c, int sumSoFar, int n){
    if (n == elems.size()){
        if (sumSoFar == c){
            cout << "{";
            for (int i = 0; i < arr.size(); i++){
                cout << arr[i];
            }
            cout << "}" << endl;
        }
        return;
    }
    //Choose
    arr.push_back(n);
    subsetSumPrint(elems, arr, c, sumSoFar + elems[n], n+1);
}
```

After choose, we can ignore the element. Before ignoring, we need to undo what we did in the choose section. Therefore, we need to pop the element we just pushed:

```cpp
void subsetSumPrint(vector<int>& elems, vector<int>& arr, int c, int sumSoFar, int n){
    if (n == elems.size()){
        if (sumSoFar == c){
            cout << "{";
            for (int i = 0; i < arr.size(); i++){
                cout << arr[i];
            }
            cout << "}" << endl;
        }
        return;
    }
    //Choose
    arr.push_back(n);
    subsetSumPrint(elems, arr, c, sumSoFar + elems[n], n+1);
    //Ignore
    arr.pop_back();
    subsetSumPrint(elems, arr, c, sumSoFar, n+1);
}
```

The code above uses an extra `sumSoFar` variable to keep track of the sum. We can solve the problem without that variable as well by just decrementing the target's, ie c, value by every element we're looking at:

```cpp
void subsetSumPrint(vector<int>& elems, vector<int>& arr, int c, int n){
    if (n == elems.size()){
        if (c == 0){
            cout << "{";
            for (int i = 0; i < arr.size(); i++){
                cout << elems[arr[i]];
            }
            cout << "}" << endl;
        }
        return;
    }
    
    arr.push_back(n);
    subsetSumPrint(elems, arr, c-elems[n], n+1);
    arr.pop_back();
    subsetSumPrint(elems, arr, c, n+1);
}
```

Also, in the code above, notice how we start at `0` and go up till `n`. In previous problems, we've started at the end of the array and made our way back. I've chosen to go the other way since it makes the logic of removal from vector easier. It naturally flows with the decision tree we've created.

Say we're given the following parameters:
```cpp
elems = {1,2,3}
target = 3
```

Then, the output will be:
```cpp
{12}
{3}
```


Tree where a left branch is taken when we choose the current element in question and right branch is taken when we ignore it:
```cpp

                {}
           /          \      +1 ?
          1           {}   
       /    \       /     \   +2 ?
     3      1      2      {}
   /   \   / \   /  \   /  \ +3 ?
  6    3  4  1  5   2  3   {}
```

Let's have a look at a sample run to better understand what's going on:

For the first base case, we would've chosen ALL elements in the `elems` array. So, our `arr` at base case where sum equals 6 would be: {1,2,3}. Here, `sumSoFar` would be 6. Since 6 != 3 (where 3 is our target), we return back to the previous state and remove the 3 from our `arr`. 

Next, we ignore 3 (since the previous decision was choose 3) and check the sum again. This time, our `arr` would have elements: {1,2} which equals the target sum of 3. Therefore, we go ahead and print the indices where we encountered.     

### 0-1 Knapsack
**The knapsack problem is a problem in combinatorial optimization: Given a set of items, each with a weight and a value, determine the number of each item to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible. It derives its name from the problem faced by someone who is constrained by a fixed-size knapsack and must fill it with the most valuable items.**

Let's see what our input will be:

```text
                    Item1   Item2   Item3   Item14
wt[] in pounds        5       4       6        3    
val[] in dollars     10      40       30      50
Capacity: 10       
```
We'll be given two arrays: a weight array that'll hold the weight of each item and a value array that holds the value of each item in dollars. We'll also be given the capacity of our sack and a value `n` denoting the number of elements in the arrays. 

This is similar to the subset problem we saw above. That is because we've got choices to make: pick an element or ignore it. Then, we need to return max of the two decisions we made.

-**Base Case**
Our base case is when we have no more decisions to make: ie when we don't have any more items or when the capacity of our sack is 0.

-**Recursive Case**
We first need to check if the current item's weight is <= the capacity, if so:
      - we can include the element, add its value, and reduce left capacity
      - we can ignore the element and move on to the next element.
When the two values above are returned, we need to return the `max` of the two decisions.

If current item's weight > capacity, we simply move to the next element.

Code:

```cpp
int knapSackRec(vector<int> wt, vector<int> val, int c, int n){
    if (n == 0 || c == 0)
        return 0;
    //Weight can either be <= c or > c
    if (wt[n] <= c){
        //Choice 1: choose this item
        //Since we're choosing this item, we add the current item's value to whatever we get from next recursive call
        int profitWithChoosing = val[n] + knapSackRec(wt, val, c - wt[n], n-1);
        //Choice 2: Don't choose this item
        //Since we don't choose this item, we simply ignore its value and move to the next item
        int profitWithNotChoosing = knapSackRec(wt, val, c, n-1);
        //Need to return max profit
        //Finally, based on the two decisions above, we choose the max of the two and return that value
        return max (profitWithChoosing, profitWithNotChoosing);
    }
    return knapSackRec(wt, val,c, n-1);
}
```

### Equal Sum Partition
This is another interesting problem: **Given an array, determine if the values in the array can be partitioned into two sets that have equal sums.**

Example: {2,3,7,8,10}
Answer: True: {2,3,10} and {8,7}

This problem is similar to subset sum where were trying to find if a subset adds up to a given sum. Here however, we need to make an observation:
- If the sum in the array is even, then and only then will we be able to partition it into two equal subsets

If the sum in the array is even, we know we can divide the sum by 2 and then check to see if there's a subset in the array that adds to that sum. If so, then obviously remaining elements would add up to the remaining half of the sum. 

### Longest Common Subsequence Length
**Given two strings, find the length of longest common subsequence present in both strings**

```cpp
string A = "ABDGEWL";
string B = "GFEDWSL";
//Longest common subsequence: GEWL therefore 4
```

(1) **Base Case**
In our recursion post, we started with the smallest valid input. Therefore, if we're given two strings as input, then what would be the smallest valid input? It would be where n == 0 OR m == 0 where n is the size of string A and m is the size of string B.

If any one of our two strings is of size 0, ie one is empty or both are empty, what is the length of LCS of these two strings? It'd be 0! So, we've figured out what our base case should be.

Translating this to code we have:

```cpp
int LCS(string A, string B, int n, int m){
    if (m == 0 || n == 0)
        return 0;
}
```

(2) **Choices we have**
Next, let's look at the case where our strings aren't empty:
* **Current characters match**:
If the two characters match, you've found a member of the sequence, so you recursively call the function again but add 1 to the total since there's a match. For example, say you have the following two strings and `n` and `m` are pointing to the characters shown:

```cpp
                n
A   B   J   L   P
                m
B   N   L   C   P
```

Here, the two characters are equal, so we will continue to recurse BUT will add 1 to our total. Also, we'll decrement both `n` and `m` to search remaining characters:

```cpp
if (A[n-1] == B[m-1]){
    return 1 + LCS(A, B, n-1, m-1); 
}
```

* **Current characters do not match**:

```cpp
                n
A   B   J   L   P
                m
B   N   L   P   K
```

In this case, you might get a match from a smaller substring in either one of the strings so you can't decrement both `n` and `m` at the same time. That is because we're told that the strings need not be of the same size. Therefore, you'll have two options in this case:

- Keep A as is and search in the shorter version of B:

```cpp
                n
A   B   J   L   P
            m
B   N   L   P   K
```

- Keep B as is and search in the shorter version of A:

```cpp
            n
A   B   J   L   P
                m
B   N   L   P   K
```

Then, you return the max of the results from these two recursive calls:

```cpp
//Decrement one and compare
b = LCS(A, B, n-1, m);
//Decrement other and compare
c = LCS(A, B, n, m-1);
return max(b,c);
```

Putting all these cases together, we get:

```cpp {numberLines: true}
int LCS(string A, string B, int n, int m){
    if (n == 0 || m == 0)
        return 0;
    if (A[n-1] == B[m-1]){
        //There's a match!
        return (1 + LCS(A, B, n-1, m-1));
    } else {
        int b = 0, c = 0;
        //Decrement one and compare
        b = LCS(A, B, n-1, m);
        //Decrement other and compare
        c = LCS(A, B, n, m-1);
        return max(b,c);
    }
}
```

The running time is exponential: $O(2^{N+M})$

### Print Longest Common Subsequence
This problem is the same as the LCS length problem except this problem asks you to **print** the longest common subsequence found. I won't go over the entire explanation of LCS again but will directly start with the LCS length code and discuss the modifications:

```cpp {numberLines: true}
int LCS(string A, string B, int n, int m){
    if (n == 0 || m == 0)
        return 0;
    if (A[n-1] == B[m-1]){
        //There's a match!
        return (1 + LCS(A, B, n-1, m-1));
    } else {
        int b = 0, c = 0;
        //Decrement one and compare
        b = LCS(A, B, n-1, m);
        //Decrement other and compare
        c = LCS(A, B, n, m-1);
        return max(b,c);
    }
}
```

So we're certain of two things:

- We'll get candidate **characters** of the longest common subsequence from the section where the characters match. ie lines 4-6. 
- We'll get our complete potential **string** candidates in the base case because that is the point where no more characters will be added to the subsequence. 

Acting on the above two certainties, I can add an additional variable to the function signature: `op` (short for output):
 
```cpp
int LCS(string A, string B, int n, int m, string op){
    if (n == 0 || m == 0){
        return 0;
    }
    if (A[n-1] == B[m-1]){
        //There's a match!
        op += A[n-1]; //ADD CHARACTER TO OP
        return (1 + LCS(A, B, n-1, m-1,op));
    } else {
        int b = 0, c = 0;
        //Decrement one and compare
        b = LCS(A, B, n-1, m,op);
        //Decrement other and compare
        c = LCS(A, B, n, m-1,op);
        return max(b,c);
    }
}
``` 
 
Then, I can print the longest subsequence seen so far in the base case:

```cpp
int LCS(string A, string B, int n, int m, string op){
    if (n == 0 || m == 0){
        cout << "op: " << op << endl;
        return 0;
    }
    if (A[n-1] == B[m-1]){
        //There's a match!
        op += A[n-1]; //ADD CHARACTER TO OP
        return (1 + LCS(A, B, n-1, m-1,op));
    } else {
        int b = 0, c = 0;
        //Decrement one and compare
        b = LCS(A, B, n-1, m,op);
        //Decrement other and compare
        c = LCS(A, B, n, m-1,op);
        return max(b,c);
    }
}
```

If you run the code above via this call: 
```cpp
int ans = LCS("ABCD", "AZBCTD", 4, 6,"");
//LCS is ABCD
```

You'll get the following output:

```cpp
op: D
op: D
op: D
op: D
op: DA
op: D
op: D
op: D
op: DA
op: DB
op: DBA
op: DCB
op: DCBA
```

You can then compare each generated string's length and return the longest length string in a global variable.

### Longest Common Substring Length
**Given a string, determine the length of the longest common substring**

Example:
```cpp
string A = "JAVA"
string B = "LAVA"
ans = 3; // AVA 
```

Before we can find the longest common substring, we need to find all the substrings of the two strings. Let's look at a sample of the two:

```cpp
JAVA -> J, JA, JAV, JAVA, A, AV, AVA, V, VA, A
LAVA -> L, LA, LAV, LAVA, A, AV, AVA V, VA, A
COMMON: A, AV, AVA, V, VA, A
LONGEST COMMON:
```

As with any recursive algorithm, let's start with the base case:
-**Base Case**
This occurs when either string has no characters ie `m` or `n` equals 0 (where `m` and `n` are lengths of each string)

```cpp
//Base case
if (m == 0 || n == 0)
    return 0;
```

-**Recursive Case**

**The characters match:**
If the characters match, we increment the variable that's keeping track of the running total, `len`, by 1 and make a recursive call with remaining characters:

```cpp
//Base case
if (m == 0 || n == 0)
    return 0;

//Recursive cases:
//Characters match
if (A[m-1] == B[n-1]){
    return subString(A,B, m-1, n-1, len + 1);
}
```

**The characters do not match:**
If the characters do not match, we decrement count of 1 string and recurse with entirety of the other string. We then decrement the remaining string and recurse with entirety of first string. For each recursive call, we reset the running total to 0:

```cpp
//Base case
if (m == 0 || n == 0)
    return 0;

//Recursive cases:
//Characters match
if (A[m-1] == B[n-1]){
    return subString(A,B, m-1, n-1, len + 1);
} else {
    //Characters don't match
    int one = subString(A, B, m, n-1, 0);
    int two = subString(A, B, m-1, n, 0);
}
```

Finally, we return max of match and the two cases of no matches:

```cpp
//Base case
if (m == 0 || n == 0)
    return 0;

//Recursive cases:
//Characters match
if (A[m-1] == B[n-1]){
    return subString(A,B, m-1, n-1, len + 1);
} else {
    //Characters don't match
    int one = subString(A, B, m, n-1, 0);
    int two = subString(A, B, m-1, n, 0);
    return max(len, max(one, two));
}
```

### Min Insertions or Deletions
**Given two strings, determine the minimum number of insertions or deletions to convert string A to string B**

Example:
```cpp
string A = "TEARS";
string B = "EARTH"

//You can remove T and S from TEARS to get EAR
//Then add T and H to EAR to get EARTH
//Deletions = 2, additions = 2
```

How do we go about tackling this problem? Let's use the process that we described above:

- Remove T and S from TEARS to get EAR
That seemed logical but why? Because both TEARS and EARTH have EAR in common so we're looking to see how we can go from TEARS to something that is also present in EARTH.

- Then add T and H to the common subsequence to get new string
Then, we added T and H to EAR to get EARTH

This seems like something we've already solved in the past! All we're doing is getting longest common subsequence of the two strings and then calculating the deletions and insertions based on the size of `A` and `B`. How do we get the **number** of deletions and insertions:

- **Deletions**

We need to remove those characters from `A` that are not in `B`. We know for sure that `B` has the longest common subsequence present, so the number of deletions would equal:

$$$
\textrm{Deletions} = \textrm{Length of A} - \textrm{Length of longest common subsequence} 
$$$

While insertions would be the difference between `B` and LCS:

$$$
\textrm{Insertions} = \textrm{Length of B} - \textrm{Length of longest common subsequence} 
$$$

Here're the steps that we performed:
```cpp
TEARS   EARTH
    \   /
     EAR 
```

Here's the function that performs our calculations for us: (LCS function is omitted since it is the same as the one from previous section):

```cpp
void minInsOrDel(string A, string B){
    int common = LCS(A, B, A.size(), B.size());
    cout << "Common length: " << common <<endl;
    cout << "Deletions: " << A.size() - common << endl;
    cout << "Additions: " << B.size() - common << endl;
}
```

### Longest Palindromic Subsequence

**Given a string, determine the longest palindromic subsequence**

Before we get into finding the longest palindromic subsequence we need to break this problem down into its pieces: We first need to see if we can get all subsequence for a string. Once we are able to get all subsequences of a string, we can check to see if that subsequence is a palindrome and then return the longest one. 

- **Get all subsequences**

Say we're given string `abac`, then, few of its subsequences are: 
```cpp
abac
aba
abc
ab
aac
aa
ac
...
``` 

Hmm, it seems like this problem requires us to choose or ignore certain characters in the string. For example, substring `aac` chose the first `a`, ignored the `b`, chose the second `a` and chose the `c`. This sounds VERY much like the subset problem: ie generate all possible subsets of this string! 

Ok, we know how to generate [subsets](/recursion#alternate-approach-to-subsets):

```cpp
void forcedRemovalSubset(string soFar, string rest){
    if (rest == ""){
        cout << soFar << endl;
        return;
    }
    //choose
    //Pick next available character from rest,
    //add it to soFar and remove it from rest
    forcedRemovalSubset(soFar + rest[0] , rest.substr(1));
    //ignore
    //Pick next available character from rest,
    //DON'T add it to soFar but just remove it from rest
    forcedRemovalSubset(soFar, rest.substr(1));
}
```

Now, in the base case, we'll have a subsequence for the particular choices we made. All we need to do is check if it's a palindrome and if so, check to see if it is longer than palindromes seen so far. We've also written a recursive function to check whether a string is a palindrome or not [here](/recursion#ispalindrome):

```cpp
bool isPalindrome(string A, int i, int j){
    if (i == j)
        return true;
    if (abs(i-j) == 1){
        return A[i] == A[j];
    }
    bool currMatch = A[i] == A[j];
    bool othersMatch = isPalindrome(A, i+1, j-1);
    return currMatch && othersMatch;
}
```

That said, here's the complete code for longest palindromic subsequence:

```cpp
bool isPalindrome(string A, int i, int j){
    if (i == j)
        return true;
    if (abs(i-j) == 1){
        return A[i] == A[j];
    }
    bool currMatch = A[i] == A[j];
    bool othersMatch = isPalindrome(A, i+1, j-1);
    return currMatch && othersMatch;
}

void lps(string soFar, string rest, string& palSS){
    if (rest == ""){
        if (isPalindrome(soFar, 0, int(soFar.size()) - 1)){
            if (soFar.length() > palSS.length()){
                cout << "New palindrome subsequence: " << soFar << endl;
                palSS = soFar;
            }
        }
        return;
    }
    lps(soFar + rest[0], rest.substr(1), palSS);
    lps(soFar, rest.substr(1), palSS);
}
```

### Matrix Chain Multiplication

**Given an array representing the dimensions of `n` matrices, return the minimum cost possible of multiplying the matrices**

Example:

```cpp
Input: p[] = {40, 20, 30, 10, 30}   
Output: 26000

Dimensions of Matrices from given array:
A = 40 X 20
B = 20 X 30
C = 30 X 10
D = 10 X 30
```

There are many different permutations where we can place parens to get our final answer. For example, we can have the following:

```cpp
(A)BCD
(AB)CD
(ABC)D
(ABCD)
A(BC)D
...
```
Each permutation above has a cost associated with it. Cost here means the number of multiplications required to cross multiply two matrices. For example, given:

$$$
  \underset{(m \times n)}{A} \times \underset{(n \times k)}{B} =
    \underset{(m \times k)}{C}
$$$

Then total number of multiplications would be:

$$$
m \times n \times k
$$$ 

Let's look at a concrete example:
$$$
   A = \begin{pmatrix}
   1 & 2 \\
   3 & 4
  \end{pmatrix}
  \qquad
  B = \begin{pmatrix}
  0 & 0 & 0\\
  1 & 1 & 1
  \end{pmatrix}
  \qquad
  C = \begin{pmatrix}
  (1*0) + (2*1)  & (1*0) + (2*1) & (1*0) + (2*1) \\
  (3*0) + (4*1) & (3*0) + (4*1) & (3*0) + (4*1)
  \end{pmatrix}
$$$

Counting the number of multiplications, you get:

$$$

2 \times 2 \times 3

$$$

Going back to our example, we need to find a way to place our parenthesis such that we get the minimum cost.


### Conclusion
- Use recursion if
    - The problems is worded such that the final solution is made up of solutions to smaller problems
    - There is some sort of counting involved: ie count the number of ways, or get the total number of ways etc
- Sometimes, you can represent recursion using decomposition diagram (linear recursion mostly) and at other times you'd need a choice diagram (counting problems: stair climb)
