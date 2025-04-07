---
title: last blog post
date: 2025-04-07
excerpt: this is the last blog post
---

 Converting tokens into token IDs
Next, let’s convert these tokens from a Python string to an integer representation to
produce the token IDs. This conversion is an intermediate step before converting the
token IDs into embedding vectors.
 To map the previously generated tokens into token IDs, we have to build a vocabulary first. This vocabulary defines how we map each unique word and special character
to a unique integer, as shown in figure 2.6