import Array "mo:core/Array";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";


actor {
  include MixinStorage();
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Type definitions
  type ResearchPaper = {
    id : Nat;
    title : Text;
    description : Text;
    tags : [Text];
    createdAt : Time.Time;
    pdfBlob : Storage.ExternalBlob;
  };

  type WritingEntry = {
    id : Nat;
    title : Text;
    excerpt : Text;
    content : Text;
    tags : [Text];
    createdAt : Time.Time;
  };

  type GalleryItem = {
    id : Nat;
    title : Text;
    description : Text;
    category : Text;
    createdAt : Time.Time;
    imageBlob : Storage.ExternalBlob;
  };

  module ResearchPaper {
    public func compare(p1 : ResearchPaper, p2 : ResearchPaper) : Order.Order {
      Nat.compare(p1.id, p2.id);
    };
  };

  module WritingEntry {
    public func compare(e1 : WritingEntry, e2 : WritingEntry) : Order.Order {
      Nat.compare(e1.id, e2.id);
    };
  };

  module GalleryItem {
    public func compare(i1 : GalleryItem, i2 : GalleryItem) : Order.Order {
      Nat.compare(i1.id, i2.id);
    };
  };

  // Storage
  let researchPapers = Map.empty<Nat, ResearchPaper>();
  var nextPaperId = 0;

  let writingEntries = Map.empty<Nat, WritingEntry>();
  var nextWritingId = 0;

  let galleryItems = Map.empty<Nat, GalleryItem>();
  var nextItemId = 0;

  // Research Paper Management
  public shared ({ caller }) func addResearchPaper(title : Text, description : Text, tags : [Text], pdfBlob : Storage.ExternalBlob) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add research papers");
    };

    let newPaper : ResearchPaper = {
      id = nextPaperId;
      title;
      description;
      tags;
      createdAt = Time.now();
      pdfBlob;
    };

    researchPapers.add(nextPaperId, newPaper);
    nextPaperId += 1;
  };

  public shared ({ caller }) func deleteResearchPaper(paperId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete research papers");
    };

    if (not researchPapers.containsKey(paperId)) {
      Runtime.trap("Research paper has already been deleted");
    };
    researchPapers.remove(paperId);
  };

  public query ({ caller }) func listResearchPapers() : async [ResearchPaper] {
    researchPapers.values().toArray().sort();
  };

  // Writing Entry Management
  public shared ({ caller }) func addWritingEntry(title : Text, excerpt : Text, content : Text, tags : [Text]) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add writing entries");
    };

    let newEntry : WritingEntry = {
      id = nextWritingId;
      title;
      excerpt;
      content;
      tags;
      createdAt = Time.now();
    };

    writingEntries.add(nextWritingId, newEntry);
    nextWritingId += 1;
  };

  public shared ({ caller }) func deleteWritingEntry(entryId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete writing entries");
    };

    if (not writingEntries.containsKey(entryId)) {
      Runtime.trap("Writing entry has already been deleted");
    };
    writingEntries.remove(entryId);
  };

  public query ({ caller }) func listWritingEntries() : async [WritingEntry] {
    writingEntries.values().toArray().sort();
  };

  // Gallery Item Management
  public shared ({ caller }) func addGalleryItem(title : Text, description : Text, category : Text, imageBlob : Storage.ExternalBlob) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add gallery items");
    };

    let newItem : GalleryItem = {
      id = nextItemId;
      title;
      description;
      category;
      createdAt = Time.now();
      imageBlob;
    };

    galleryItems.add(nextItemId, newItem);
    nextItemId += 1;
  };

  public shared ({ caller }) func deleteGalleryItem(itemId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete gallery items");
    };

    if (not galleryItems.containsKey(itemId)) {
      Runtime.trap("Gallery item has already been deleted");
    };
    galleryItems.remove(itemId);
  };

  public query ({ caller }) func listGalleryItems() : async [GalleryItem] {
    galleryItems.values().toArray().sort();
  };
};
