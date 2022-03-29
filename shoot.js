var Shoot = pc.createScript('shoot');

Shoot.attributes.add('maxAmmo', {type : 'number', default : 30});
Shoot.attributes.add('range', {type : 'number', default : 30});
Shoot.attributes.add('text', {type : 'entity'});
//Shoot.attributes.add('textgun', {type : 'entity'});
Shoot.attributes.add('text2', {type : 'entity'});
Shoot.attributes.add('particleSys', {type : 'entity'});
Shoot.attributes.add('debugColor1', {type : 'rgba'});
Shoot.attributes.add('gunPoint', {type : 'entity'});
Shoot.attributes.add('hitImpulse', {type : 'number', default : 10});
Shoot.attributes.add('damage', {type : 'number', default : 10});
Shoot.attributes.add('camera', {type : 'entity'});
Shoot.attributes.add('player', {type : 'entity'});
Shoot.attributes.add('ammoDrop', {type : 'entity'});
Shoot.attributes.add('ammohovertext', {type : 'entity'});
Shoot.attributes.add('ammohovertext1', {type : 'entity'});
Shoot.attributes.add('ammohovertext2', {type : 'entity'});
Shoot.attributes.add('ammohovertext3', {type : 'entity'});
Shoot.attributes.add('value', {type : 'number', default : 60});



// initialize code called once per entity
Shoot.prototype.initialize = function() {
    //this.entity.anim.setBoolean('Idle', true);
    this.currentAmmo = 0;
    //this.currentAmmo = this.maxAmmo;
    this.currentAmmo = 30;
    this.canShoot = true;
    //this.ammohovertext.enabled = false;
    //this.entity.anim.baseLayer.transition('Idle', 0.2); 
};

// update code called every frame
Shoot.prototype.update = function(dt) {
    this.ammohovertext.enabled = false;
    this.ammohovertext1.enabled = false;
    this.ammohovertext2.enabled = false;
    this.ammohovertext3.enabled = false;
    var playerPos = this.player.getPosition();
    var ammoPos = this.ammoDrop.getPosition();
    var distance = ammoPos.sub(playerPos).length();
    var from = this.gunPoint.getPosition();
    var to = this.camera.camera.screenToWorld(screen.width / 2 , screen.height / 2 - 37, this.range);
    var result = this.app.systems.rigidbody.raycastFirst(from, to);    
    this.distanceThreshold = 5;
    this.text2.element.text = '/ ' + this.value;
    if( distance < this.distanceThreshold){
        this.ammohovertext.enabled = true;
        this.ammohovertext1.enabled = true;
        this.ammohovertext2.enabled = true;
        this.ammohovertext3.enabled = true;
       //this.moreammo();  
       
        if (this.app.keyboard.wasPressed(pc.KEY_E)) {
          //  this.text2.element.text = '/ ' + this.value;
            //this.ammoDrop.enabled = false;
            this.moreammo();
    }
  }
    //if(this.ammoDrop.enabled == false); {
       // this.text2.element.text = this.value;
   // }
   if(this.value <= 0){
       this.canReload = false;
   }
   else
   {
       this.canReload = true;
   }
    
    if(this.currentAmmo <= 0)
    {
        this.canShoot = false;
    }
    else
    {
        this.canShoot = true;
    }
    
    
    if(this.app.mouse.wasPressed(pc.MOUSEBUTTON_LEFT) && this.canShoot === true)
    {
        if(result)
        {
            result.entity.collision.entity.rigidbody.applyImpulse(this.camera.forward.scale(this.hitImpulse), result.normal);
            this.entity.anim.setTrigger('Shoot');
            this.currentAmmo -= 1;



            
        }else
        {
            return;
        }
        
        if(result.entity.name == 'fastboi zombie')
        {
            result.entity.script.target.TakeDamage(this.damage);
        }
        
        this.particleSys.particlesystem.play();
        this.particleSys.particlesystem.reset();
        
    }
   
    if(this.canReload == true){
        if(this.currentAmmo <= 25) {
        this.reserveammo = this.maxAmmo - this.currentAmmo;
         if(this.app.keyboard.wasPressed(pc.KEY_R))
     {
         
         this.canShoot = false;
        this.entity.anim.setTrigger('Reload');  
        //this.entity.anim.baseLayer.transition('Reload', 0.2);  
        //this.currentAmmo = 30;//this.currentAmmo + (this.value - 30);
        //this.value = this.value - this.currentAmmo;
        setTimeout(function() {
            if(this.value <= 5){
                this.value = 0;
            //this.currentAmmo = 30;
            }
            this.currentAmmo = 30;//this.currentAmmo + (this.value - 30);
            this.value = this.value - this.currentAmmo;
            this.entity.anim.setTrigger('reloaddone');
            this.canShoot = true;
            this.entity.anim.setTrigger('Idle');
    
        }.bind(this), 3000);




         
        }
     } 
    }


    if(this.value <= 0 && this.currentAmmo <= 0){
        this.canShoot = false;
    }
    this.text.element.text = this.currentAmmo;
    //this.textgun.element.text = this.currentAmmo;
    


};
Shoot.prototype.moreammo = function() {
        //this.text2.element.text = '/ ' + this.value;
        this.value = this.value += 30;
        this.ammoDrop.enabled = false;
          
};
